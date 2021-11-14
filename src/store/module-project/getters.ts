import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { IProjectState } from "./state";

const getters: GetterTree<IProjectState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
