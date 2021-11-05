import { ExecException } from "child_process";
import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { ICustom, IResult, ITaskSuccessState } from "./state";

interface createTaskSuccess {
  shortcode: string;
  result: IResult;
  task_id: string;
  user_id: string;
  project_id: string;
  custom?: ICustom;
  startedAt: Date;
}

const actions: ActionTree<ITaskSuccessState, StateInterface> = {
  createTaskSuccess: async (
    { commit, rootState },
    payload: createTaskSuccess
  ) => {
    try {
      await api.post("task-success/create", payload, {
        headers: {
          Authorization: `Bearer ${rootState.moduleAuth.authentication.access_token}`,
        },
      });
    } catch (error) {
      throw new Error((error as ExecException).message);
    }
  },
};

export default actions;
