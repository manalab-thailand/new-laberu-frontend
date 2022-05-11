import { ExecException } from "child_process";
import { ActionTree } from "vuex";
import { api } from "../../boot/axios";
import { StateInterface } from "../index";
import { ITaskImageState } from "./state";
interface getTaskImage {
  user_id: string;
  project_id: string;
}
const actions: ActionTree<ITaskImageState, StateInterface> = {
  getTaskImage: async ({ rootState, commit }, payload: getTaskImage) => {
    try {
      const { data } = await api.post("task-image/get-task-image", {
        user_id: payload.user_id,
        project_id: payload.project_id,
      });

      if (data.message == "task image not avaliable for you") {
        return false;
      } else {
        commit("onGetTaskImage", data.data);
        return true;
      }
    } catch (error) {
      throw new Error((error as ExecException).message);
    }
  },
};

export default actions;
