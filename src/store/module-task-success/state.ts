export interface ITaskSuccess {
  shortcode: string;
  accept: boolean;
  result: IResult;
  price: number;
  task_id: string;
  user_id: string;
  project_id: string;
  custom: ICustom;
  payment_status: PaymentStatus;
  paymentAt: Date;
  startedAt: Date;
  createdAt: Date;
  updatedAt: Date;
  update_by: string;
}

export interface IResult {
  annotation?: IResultAnnotation;
  labelling?: IResultLabelling[];
  classification?: IResultClassification[];
}

export interface IResultAnnotation {
  description: string;
}

export interface IResultLabelling {
  size: ILabelling;
  detection: IDetection;
}

export interface ILabelling {
  width: string;
  height: string;
}

export interface IDetection {
  name: string;
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
}

export interface IResultClassification {
  class: Object;
}

export enum PaymentStatus {
  WAITING = "waiting",
  DOING = "doing",
  SUCCUSS = "success",
}

export interface ICustom {
  user_id: string;
  group_id: string;
}

export interface IUserTaskSuccess {
  total: number;
  total_price: number;
  paid: number;
  pending: number;
  project_name: string;
  label_type: string;
}

export interface ITaskSuccessState {
  task_success: ITaskSuccess[];
  user_task_success: IUserTaskSuccess[];
  history_lists: ITaskSuccess[];
}

const taskSuccessState = (): ITaskSuccessState => ({
  task_success: [] as ITaskSuccess[],
  user_task_success: [] as IUserTaskSuccess[],
  history_lists: [] as ITaskSuccess[],
});

export default taskSuccessState;
