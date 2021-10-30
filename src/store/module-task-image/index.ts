import { Module } from "vuex";
import { StateInterface } from "../index";
import state, { ITaskImageState } from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

const exampleModule: Module<ITaskImageState, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
