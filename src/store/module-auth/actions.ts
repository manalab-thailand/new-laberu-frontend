import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IUser } from "../module-users/state";
import { IAuthState } from "./state";

const actions: ActionTree<IAuthState, StateInterface> = {
  async onLogin({ commit }, { uid }) {
    const { data } = await api.post("/auth/login", { uid });
    commit("onUserLogin", data.data);
  },
  updateUser: async ({ commit, rootState }, payload: IUser) => {
    try {
      await api.put(
        "/user/update",
        {
          ...payload,
          update_by: "user",
        },
        {
          headers: {
            Authorization: `Bearer ${rootState.moduleAuth.authentication.access_token}`,
          },
        }
      );

      commit("onUpdateUser", payload);
    } catch (error) {
      console.log(error);
    }
  },
};

export default actions;
