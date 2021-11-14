import { MutationTree } from "vuex";
import { IProject, IProjectState } from "./state";

const mutation: MutationTree<IProjectState> = {
  onGetProject: async (state, payload: IProject[]) => {
    state.projects = payload;
  },
};

export default mutation;
