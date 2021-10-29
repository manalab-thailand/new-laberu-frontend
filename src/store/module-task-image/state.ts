export interface ITaskImage {
  shortcode: string;
  status: TaskImageStatus;
  process: TaskImageProcess;
  doingAt: string;
  doneAt: string;
  project_id: string;
  createAt: string;
}

export enum TaskImageProcess {
  DOING = "doing",
  SUCCESS = "success",
}

export enum TaskImageStatus {
  WAITING = "waiting",
  DOING = "doing",
  SUCCESS = "success",
}

export interface ITaskImageState {
  task_image: ITaskImage;
}

const taskImageState = (): ITaskImageState => ({
  task_image: {} as ITaskImage,
});

export default taskImageState;
