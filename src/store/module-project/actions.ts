import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IProject, IProjectState } from "./state";

const actions: ActionTree<IProjectState, StateInterface> = {
  getProjects: async ({ rootState, commit }) => {
    const { data } = await api.get("project/find-by-user");

    commit("onGetProject", data);
  },
};

export default actions;
