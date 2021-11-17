import { MutationTree } from "vuex";
import { ITaskSuccessState, IUserTaskSuccess } from "./state";

const mutation: MutationTree<ITaskSuccessState> = {
  onGetTaskSuccessByUserId(state, payload: IUserTaskSuccess[]) {
    state.user_task_success = payload;
  },
};

export default mutation;
