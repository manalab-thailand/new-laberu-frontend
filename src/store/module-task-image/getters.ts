import { GetterTree } from "vuex";
import { StateInterface } from "../index";
import { ITaskImageState } from "./state";


const getters: GetterTree<ITaskImageState, StateInterface> = {
  someAction(/* context */) {
    // your code
  },
};

export default getters;
