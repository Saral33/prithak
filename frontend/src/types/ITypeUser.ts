export interface IInputRegisterFields {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface IInputLoginFields {
  email: string;
  password: string;
}

export interface ILoginRes {
  data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    name: string;
    email: string;
    role: string;
  };
  status: string;
  message: string;
}

export interface IProfileRes {
  status: string;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
}

export interface IRegisterRes {
  status: string;
  message: string;
}

export interface IAdminRes {
  status: string;
  data: IAdminData;
}

export interface IAdminData {
  userCount: number;
  taskCount: number;
}
