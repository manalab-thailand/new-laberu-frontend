export interface IUser {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone_number: string;
  career: string;
  province: string;
  status?: UserStatus;
  role?: UserRole;
  uid?: string;
  payment: IPayment;
  createdAt?: string;
  updatedAt?: string;
  update_by?: string;
}

export interface IPayment {
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
}

export enum UserRole {
  USER = "user",
  ADMIN = "admin",
  CUSTOMER = "customer",
}

export enum UserStatus {
  ACTIVE = "active",
  DISABLE = "disable",
}

export interface IUserState {
  users: IUser[];
}

const userState = (): IUserState => ({
  users: [] as IUser[],
});

export default userState;
