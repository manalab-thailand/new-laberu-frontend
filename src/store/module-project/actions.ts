import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { IProject, IProjectState } from "./state";

const actions: ActionTree<IProjectState, StateInterface> = {
  //   {
  //     headers: {
  //       Authorization: `Bearer ${rootState.moduleAuth.authentication.access_token}`,
  //     },
  //   }
};

export default actions;
