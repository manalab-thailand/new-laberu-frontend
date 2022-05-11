import { ExecException } from "child_process";
import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IPayment, IUser, UserRole, UserStatus } from "../module-users/state";
import { IAuthState } from "./state";

export interface IRegisterUser {
  firstname: string;
  lastname: string;
  phone_number: string;
  career: string;
  email: string;
  province: string;
  uid: string;
  payment: IPayment;
}

const actions: ActionTree<IAuthState, StateInterface> = {
  async onLogin({ commit }, payload: { uid: string; email: string }) {
    const { uid, email } = payload;

    const { data } = await api.post("/auth/login", { uid });

    if (data.status === 404) {
      commit("onUserNotRegistered", payload);
    } else {
      commit("onUserLogin", data.data);
    }

    return data;
  },

  registerUser: async ({ commit, dispatch }, payload: IRegisterUser) => {
    try {
      const { data } = await api.post("user/create-user", {
        ...payload,
        status: UserStatus.ACTIVE,
        role: UserRole.USER,
      });

      await dispatch("onLogin", { uid: payload.uid, email: payload.email });

      return data;
    } catch (error) {
      throw new Error((error as ExecException).message);
    }
  },

  updateUser: async ({ commit, rootState }, payload: IUser) => {
    try {
      await api.put("/user/update", {
        ...payload,
        update_by: "user",
      });

      commit("onUpdateUser", payload);
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;
