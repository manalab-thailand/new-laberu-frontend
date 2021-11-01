import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IProject, IProjectState } from "./state";

const actions: ActionTree<IProjectState, StateInterface> = {
  getProjects: async ({ rootState, commit }) => {
    const { data } = await api.get("project/find-by-user", {
      headers: {
        Authorization: `Bearer ${rootState.moduleAuth.authentication.access_token}`,
      },
    });

    commit("onGetProject", data);
  },
};

export default actions;
