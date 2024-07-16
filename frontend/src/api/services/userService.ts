import { privateAxios, publicAxios } from '@/config/axiosConfig';
import { ILoginRes, IProfileRes } from '@/types/ITypeLogin';
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

export const getProfileService = async (): Promise<
  AxiosResponse<IProfileRes>
> => {
  const res = await privateAxios.get<IProfileRes>('/auth/me');
  return res;
};
