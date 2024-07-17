import { privateAxios, publicAxios } from '@/config/axiosConfig';
import {
  IAdminRes,
  ILoginRes,
  IProfileRes,
  IRegisterRes,
} from '@/types/ITypeUser';
import { AxiosResponse } from 'axios';

export const loginService = async (
  email: string,
  password: string
): Promise<AxiosResponse<ILoginRes>> => {
  const res = await publicAxios.post<ILoginRes>('/auth/login', {
    email,
    password,
  });
  return res;
};

export const registerService = async (
  name: string,
  email: string,
  password: string
): Promise<AxiosResponse<IRegisterRes>> => {
  const res = await publicAxios.post<IRegisterRes>('/auth/register', {
    name,
    email,
    password,
  });
  return res;
};
export const getProfileService = async (): Promise<
  AxiosResponse<IProfileRes>
> => {
  const res = await privateAxios.get<IProfileRes>('/auth/me');
  return res;
};

export const logoutService = async () => {
  const res = await privateAxios.post('/auth/logout');
  return res;
};

export const getAdminDataService = async (): Promise<
  AxiosResponse<IAdminRes>
> => {
  const res = await privateAxios.get<IAdminRes>('/auth/admin');
  return res;
};
