import Button from '@/components/Button';
import CustomInput from '@/components/Input';
import { IInputRegisterFields } from '@/types/ITypeLogin';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@/lib/validator/schema';
const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IInputRegisterFields>({
    resolver: zodResolver(registerSchema),
  });
  return (
    <div className="container mx-auto ">
      <div className="w-full px-5 mt-10 flex justify-center items-center h-full ">
        <div className="w-full  max-w-[500px]  px-6 py-8 rounded shadow-md text-black ">
          <h1 className="mb-8 text-3xl text-center">Register</h1>
          <form onSubmit={handleSubmit((data) => console.log(data))}>
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
