import {
  createTask,
  editTask,
  getTaskDetail,
} from '@/api/services/taskService';
import Button from '@/components/Button';
import CustomInput from '@/components/Input';
import Select from '@/components/Select';
import { taskCreateSchema } from '@/lib/validator/taskSchema';
import { ITaskCreate } from '@/types/ITypeTask';
import { zodResolver } from '@hookform/resolvers/zod';
import axios, { AxiosError } from 'axios';
import { useMemo } from 'react';

import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { QueryClient, useMutation, useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTask = () => {
  const location = useParams();
  const isEdit = location?.id ? true : false;
  const { data, isLoading } = useQuery({
    queryKey: ['get-task-edit', location?.id],
    queryFn: () =>
      getTaskDetail(location?.id || '').then((res) => res?.data?.data),
    onSuccess: (dat) => {
      reset({
        title: dat?.title,
        description: dat?.description,
        status: dat?.status,
        deadline: new Date(dat?.deadline)
          .toISOString()
          .substring(0, 10) as unknown as Date,
        priority: dat?.priority,
      });
    },
    enabled: isEdit,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITaskCreate>({
    resolver: zodResolver(taskCreateSchema),
    defaultValues: useMemo(() => {
      return { title: data?.title };
    }, [data]),
  });

  const navigate = useNavigate();

  const qc = new QueryClient();

  const mutation = useMutation({
    mutationKey: [isEdit ? 'edit-task' : 'create-task'],
    mutationFn: (data: ITaskCreate) => {
      return isEdit ? editTask(location?.id || '', data) : createTask(data);
    },
    onSuccess: () => {
      toast.success(
        isEdit ? 'Task edited successfully' : 'Task created successfully'
      );
      navigate('/dashboard');
      qc.invalidateQueries('tasks');
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const createTaskHandler = (data: ITaskCreate) => {
    mutation.mutate(data);
  };
  return (
    <div className="w-full p-8">
      <div className="max-w-[1100px] w-full mx-auto">
        <h1 className="text-4xl">{isEdit ? 'Edit Task' : 'Create Task'}</h1>
        <div className="mt-10">
          {isLoading ? (
            <div>Loading....</div>
          ) : (
            <form
              onSubmit={handleSubmit((data) => createTaskHandler(data))}
              className="mt-1 max-w-[400px]"
            >
              <CustomInput
                type="text"
                errors={errors}
                placeholder="Eg: Walk the dog"
                register={register}
                label="Title of task"
                name="title"
              />{' '}
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                placeholder="Description of your task"
                rows={3}
                className="border resize-none border-grey-light w-full p-3 rounded mb-1"
                {...register('description')}
              />
              <CustomInput
                type="date"
                errors={errors}
                register={register}
                label="Deadline"
                name="deadline"
              />
              <Select
                useControlled={false}
                label="Select Priority"
                register={register}
                errors={errors}
                name="priority"
                data={[
                  { title: 'Low', value: 'low' },
                  { title: 'Medium', value: 'medium' },
                  { title: 'High', value: 'high' },
                ]}
              />
              <Select
                useControlled={false}
                label="Select Status"
                register={register}
                errors={errors}
                name="status"
                data={[
                  { title: 'Pending', value: 'pending' },
                  { title: 'In Progress', value: 'inprogress' },
                  { title: 'Completed', value: 'completed' },
                ]}
              />
              <Button type="submit" className="mt-4">
                Create Task
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
