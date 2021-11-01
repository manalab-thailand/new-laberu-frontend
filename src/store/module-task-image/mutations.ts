import { MutationTree } from "vuex";
import { IImageData, ITaskImage, ITaskImageState } from "./state";
interface TaskImageMutation {
  task_image: ITaskImage;
  image_data: IImageData;
}

const mutation: MutationTree<ITaskImageState> = {
  onGetTaskImage: (state, payload: TaskImageMutation) => {
    state.task_image = payload.task_image;
    state.image_data = payload.image_data;
  },
};

export default mutation;
