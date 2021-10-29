import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { ITaskSuccessState } from "./state";

const getters: GetterTree<ITaskSuccessState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
