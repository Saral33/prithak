import { logoutService } from '@/api/services/userService';
import Icons from '@/components/Icons';
import { userMenu, adminMenu } from '@/expressions/menuExpressions';
import useAuth from '@/hooks/useAuth';
import { useAppDispatch } from '@/stores/store';
import { logout } from '@/stores/userReducer';
import axios, { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { Link, useLocation } from 'react-router-dom';

const MenuBar = () => {
  const { auth } = useAuth();
  const dispatch = useAppDispatch();
  const router = useLocation();
  console.log(router.pathname);
  const mutation = useMutation({
    mutationKey: 'logout',
    mutationFn: () => logoutService(),
    onSuccess: () => {
      toast.success('Logout successfully');
      dispatch(logout());
    },
    onError: (error: AxiosError | Error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      } else {
        toast.error(error.message);
      }
    },
  });
  const logoutHandler = () => {
    mutation.mutate();
  };
  const menuExpression = auth?.role === 'user' ? userMenu : adminMenu;
  return (
    <div className="bg-[#f5f5f5] shadow-md h-full w-[250px]">
      <div className="p-5">
        <h1 className="text-3xl text-center">Menu</h1>

        <ul className="mt-10 space-y-4">
          {menuExpression.map((menu) => (
            <li key={menu.id} className="mb-2  hover:bg-slate-200 ">
              <Link className="flex gap-3   p-2" to={menu.path}>
                <Icons name={menu.icon} />{' '}
                <span
                  className={`${
                    router.pathname === menu.path ? 'text-blue-500' : ''
                  }`}
                >
                  {menu.name}
                </span>
              </Link>
            </li>
          ))}
          <li
            onClick={logoutHandler}
            className="mb-2 cursor-pointer hover:bg-slate-200"
          >
            <p className="flex gap-3  p-2">
              <Icons name={'Logout'} /> <span>Logout</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
