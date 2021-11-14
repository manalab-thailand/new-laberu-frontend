import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IAuthState } from "./state";

const actions: ActionTree<IAuthState, StateInterface> = {
  async onLogin({ commit }, { uid }) {
    const { data } = await api.post("/auth/login", { uid });
    commit("onUserLogin", data.data);
  },
};

export default actions;
