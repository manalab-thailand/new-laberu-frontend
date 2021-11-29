import { IUser } from "../module-users/state";

export interface IAuth {
  access_token: string;
  token_type: string;
  expiresIn: string;
  isRegister: boolean;
}

export interface IAuthState {
  user: IUser;
  authentication: IAuth;
}

const authState = (): IAuthState => ({
  user: {} as IUser,
  authentication: {} as IAuth,
});

export default authState;
