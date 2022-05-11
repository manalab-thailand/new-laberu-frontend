import { ExecException } from "child_process";
import qs from "qs";
import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { ICustom, IResult, ITaskSuccess, ITaskSuccessState } from "./state";

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
      await api.post("task-success/create", payload);
    } catch (error) {
      throw new Error((error as ExecException).message);
    }
  },

  getTaskSuccessByUserId: async ({ commit, rootState }, { user_id }) => {
    try {
      const { data } = await api.post("task-success/find-by-user", { user_id });

      commit("onGetTaskSuccessByUserId", data);
    } catch (error) {
      throw new Error((error as ExecException).message);
    }
  },

  getHistory: async (ctx, payload) => {
    try {
      const query = qs.stringify(payload, { encodeValuesOnly: true });

      const { data } = await api.get<ITaskSuccess>(
        `task-success/history?${query}`
      );

      ctx.commit("onGetHistory", data);
    } catch (error) {
      throw new Error((error as ExecException).message);
    }
  },
};

export default actions;
