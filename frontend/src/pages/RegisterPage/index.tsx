import Button from '@/components/Button';
import CustomInput from '@/components/Input';
import { IInputRegisterFields } from '@/types/ITypeUser';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validator/schema';
import { useMutation } from 'react-query';
import { registerService } from '@/api/services/userService';
import toast from 'react-hot-toast';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';
const RegisterPage = () => {
  const [message, setMessage] = useState('');
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputRegisterFields>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationKey: 'register',
    mutationFn: (data: IInputRegisterFields) =>
      registerService(data.name, data.email, data.password).then(
        (res) => res?.data
      ),
    onSuccess: () => {
      toast.success('Register successfully');
      setMessage('Register successfully. Now you can login');
      reset();
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  const registerHandler = (data: IInputRegisterFields) => {
    mutation.mutate(data);
  };
  return (
    <div className="container mx-auto ">
      <div className="w-full px-5 mt-10 flex justify-center items-center h-full ">
        <div className="w-full  max-w-[500px]  px-6 py-8 rounded shadow-md text-black ">
          <h1 className="mb-8 text-3xl text-center">Register</h1>
          {message && (
            <small className="text-success pb-5">
              {message}. you can now login .{' '}
              <Link className="underline" to={'/login'}>
                Click to login
              </Link>{' '}
            </small>
          )}

          <form
            className="mt-1"
            onSubmit={handleSubmit((data) => registerHandler(data))}
          >
            <CustomInput<IInputRegisterFields>
              type="text"
              errors={errors}
              placeholder="Full Name"
              register={register}
              label="Full Name"
              name="name"
            />
            <CustomInput<IInputRegisterFields>
              errors={errors}
              placeholder="Email"
              register={register}
              label="Email"
              name="email"
            />
            <CustomInput<IInputRegisterFields>
              type="password"
              errors={errors}
              placeholder="Password"
              register={register}
              label="Password"
              name="password"
            />
            <CustomInput<IInputRegisterFields>
              type="password"
              errors={errors}
              placeholder="Confirm Password"
              register={register}
              label="Confirm Password"
              name="confirmPassword"
            />

            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>

          <div className="text-grey-dark mt-6">
            Already Account?
            <Link
              className="no-underline ml-2 border-b border-blue text-blue"
              to="/login"
            >
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
