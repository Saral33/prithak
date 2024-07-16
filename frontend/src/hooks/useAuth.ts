import { useAppDispatch, useAppSelector } from '@/stores/store';
import { IUserData, login } from '@/stores/userReducer';

const useAuth = () => {
  const auth = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const setUser = (data: IUserData) => {
    dispatch(login(data));
  };

  return { auth, setUser };
};

export default useAuth;
