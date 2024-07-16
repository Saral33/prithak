import Button from '@/components/Button';
import CustomInput from '@/components/Input';
import { IInputLoginFields } from '@/types/ITypeLogin';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '@/lib/validator/schema';
import { useMutation } from 'react-query';
import { loginService } from '@/api/services/userService';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import useAuth from '@/hooks/useAuth';
const LoginPage = () => {
  const router = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputLoginFields>({
    resolver: zodResolver(loginSchema),
  });
  const auth = useAuth();
  const mutation = useMutation({
    mutationKey: 'login',
    mutationFn: (data: IInputLoginFields) =>
      loginService(data.email, data.password).then((res) => res?.data),
    onSuccess: (data) => {
      const { accessToken, refreshToken, userId, name, email, role } =
        data.data;

      auth.setUser({
        auth: {
          isLoggedIn: true,
          refreshToken,
          accessToken,
        },
        name,
        email,
        userId,
        role,
      });
      toast.success('Login successfully');
      if (role === 'admin') {
        router('/admin');
      } else router('/dashboard');
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    },
  });

  const onSubmit = (data: IInputLoginFields) => {
    mutation.mutate(data);
  };
  return (
    <div className="container mx-auto h-screen">
      <div className="w-full px-5 flex justify-center items-center h-full ">
        <div className="w-full  max-w-[500px]  px-6 py-8 rounded shadow-md text-black ">
          <h1 className="mb-8 text-3xl text-center">Login</h1>
          <form onSubmit={handleSubmit((data) => onSubmit(data))}>
            <CustomInput<IInputLoginFields>
              errors={errors}
              placeholder="Email"
              register={register}
              label="Email"
              name="email"
              type="email"
            />

            <CustomInput<IInputLoginFields>
              type="password"
              errors={errors}
              placeholder="Password"
              register={register}
              label="Password"
              name="password"
            />

            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="text-grey-dark mt-6">
            No Account?
            <Link
              className="no-underline ml-2 border-b border-blue text-blue"
              to="/register"
            >
              Register Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
