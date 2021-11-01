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
    const { data } = await api.post(
      "task-image/get-task-image",
      {
        user_id: payload.user_id,
        project_id: payload.project_id,
      },
      {
        headers: {
          Authorization: `Bearer ${rootState.moduleAuth.authentication.access_token}`,
        },
      }
    );

    commit("onGetTaskImage", data.data);
  },
};

export default actions;
