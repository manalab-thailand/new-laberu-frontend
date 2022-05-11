import { MutationTree } from "vuex";
import { ITaskSuccess, ITaskSuccessState, IUserTaskSuccess } from "./state";

const mutation: MutationTree<ITaskSuccessState> = {
  onGetTaskSuccessByUserId(state, payload: IUserTaskSuccess[]) {
    state.user_task_success = payload;
  },
  onGetHistory(state, payload: ITaskSuccess[]) {
    state.history_lists = payload;
  },
};

export default mutation;
