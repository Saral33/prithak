import { privateAxios } from '@/config/axiosConfig';
import {
  IGetAllTaskRes,
  IGetTaskDetail,
  ISearchData,
  ITaskCreate,
} from '@/types/ITypeTask';
import { IRegisterRes } from '@/types/ITypeUser';
import { AxiosResponse } from 'axios';
import moment from 'moment';

export const getAllTasks = async (
  page: number,
  limit: string,
  sortBy: string
): Promise<AxiosResponse<IGetAllTaskRes>> => {
  const res = await privateAxios.get<IGetAllTaskRes>(
    `/tasks?page=${page}&limit=${limit}&sortBy=${sortBy}`
  );
  return res;
};

export const createTask = async (
  data: ITaskCreate
): Promise<AxiosResponse<IRegisterRes>> => {
  const { deadline, ...rest } = data;
  const res = await privateAxios.post<IRegisterRes>('/tasks', {
    ...rest,
    deadline: moment(deadline).format('YYYY-MM-DD'),
  });
  return res;
};

export const deleteTask = async (
  id: string
): Promise<AxiosResponse<IRegisterRes>> => {
  const res = await privateAxios.delete<IRegisterRes>(`/tasks/${id}`);
  return res;
};

export const editTask = async (
  id: string,
  data: IGetTaskDetail
): Promise<AxiosResponse<IRegisterRes>> => {
  const { deadline, ...rest } = data;
  const res = await privateAxios.put<IRegisterRes>(`/tasks/${id}`, {
    ...rest,
    deadline: moment(deadline).format('YYYY-MM-DD'),
  });
  return res;
};

export const getTaskDetail = async (
  id: string
): Promise<AxiosResponse<{ data: IGetTaskDetail }>> => {
  const res = await privateAxios.get<{ data: IGetTaskDetail }>(`/tasks/${id}`);
  return res;
};

export const searchTask = async (
  value: string
): Promise<AxiosResponse<ISearchData>> => {
  const res = await privateAxios.get<ISearchData>(`/tasks/search/${value}`);
  return res;
};
