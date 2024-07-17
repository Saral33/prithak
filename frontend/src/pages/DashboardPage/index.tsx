import {
  deleteTask,
  getAllTasks,
  searchTask,
} from '@/api/services/taskService';
import Card from '@/components/Card';
import Paginate from '@/components/Paginate';
import SeacrhBar from '@/components/SeacrhBar';
import Select from '@/components/Select';
import { perpageExp, sortExp } from '@/expressions/sortExpressions';
import useDebounce from '@/hooks/useDebounce';
import axios, { AxiosError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';

const DashboardPage = () => {
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(Number(params?.get('page')) || 1);
  const [perPage, setPerpage] = useState('10');
  const [sortBy, setSortBy] = useState(sortExp[0].value);
  const [value, setValue] = useState('');
  const debouncedSearch = useDebounce(value, 500);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['tasks', page, perPage, sortBy],
    queryFn: () => getAllTasks(page, perPage, sortBy).then((res) => res.data),
  });

  const { data: searchData, isLoading: isLoadingSearch } = useQuery({
    queryKey: ['search', debouncedSearch],
    queryFn: () => searchTask(debouncedSearch).then((res) => res.data),
    enabled: !!value && !!debouncedSearch,
  });
  const formatedSearchData = useMemo(() => {
    return searchData?.data?.map((item) => {
      return {
        _id: item?._id,
        title: item?._source?.title,
        description: item?._source?.description,
        status: item?._source?.status,
        deadline: item?._source?.deadline,
        priority: item?._source?.priority,
        userId: item?._source?.userId,
      };
    });
  }, [searchData]);

  const pageHandler = (page: number) => {
    setPage(page);
    setParams({ page: page.toString() });
  };
  useEffect(() => {
    setPage(1);
    setParams({ page: '1' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perPage]);
  const isSearch = !!value && !!searchData;
  const dataToRender = isSearch ? formatedSearchData : data?.data;
  const naviagate = useNavigate();
  const qc = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: 'delete-task',
    mutationFn: (id: string) => deleteTask(id).then((res) => res),
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    },
    onSuccess: () => {
      toast.success('Task Deleted');
      setValue('');

      qc.invalidateQueries('search');
      qc.invalidateQueries('tasks');
    },
  });
  return (
    <div className="w-full p-8">
      <div className="max-w-[1100px] w-full mx-auto">
        <h1 className="md:text-4xl">Your Task Lists</h1>
        <div className="mt-10">
          <SeacrhBar value={value} setValue={setValue} />
          {!isSearch && (
            <div className="flex w-full flex-wrap gap-5 mt-4">
              <Select
                label="Perpage"
                className=" w-full  md:w-[150px]"
                name="perpage"
                value={perPage.toString()}
                setValue={setPerpage}
                data={perpageExp}
                useControlled={true}
              />
              <Select
                setValue={setSortBy}
                label="Sort By"
                className=" w-full md:w-[200px]"
                name="sort"
                data={sortExp}
                useControlled={true}
                value={sortBy}
              />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
            {isLoading || isLoadingSearch ? (
              <div>loading....</div>
            ) : isError ? (
              <div>Something went wrong</div>
            ) : dataToRender?.length === 0 ? (
              <div>
                {isSearch
                  ? 'No tasks found fro given search query'
                  : 'You have no tasks. Add tasks to see here'}
              </div>
            ) : (
              dataToRender &&
              dataToRender?.map((task) => (
                <Card
                  deleteTask={() => deleteMutation.mutate(task?._id as string)}
                  editTask={() => {
                    naviagate(`/edit-task/${task._id}`);
                  }}
                  id={task?._id as string}
                  key={task._id}
                  title={task?.title || ''}
                  description={task?.description}
                  status={task?.status}
                  deadline={task?.deadline}
                  priority={task?.priority}
                />
              ))
            )}
          </div>
          {!isSearch && (
            <div className="mt-10">
              <Paginate
                page={page}
                setPage={pageHandler}
                total={data?.totalPages || 0}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
