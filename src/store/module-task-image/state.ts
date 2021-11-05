export interface IImageData {
  _id: string;
  shortcode: string;
  annotation: IAnnotation;
  labelling: ILabelling;
  classification: IClassification;
  project_id: string;
  createdAt: Date;
  updatedAt: Date;
  update_by: string | null;
}

export interface IAnnotation {
  decsription: string;
}

export interface IClassification {}

export interface ILabelling {
  width: string;
  height: string;
}

export interface ITaskImage {
  _id: string;
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
  image_data: IImageData;
}

const taskImageState = (): ITaskImageState => ({
  task_image: {} as ITaskImage,
  image_data: {} as IImageData,
});

export default taskImageState;
