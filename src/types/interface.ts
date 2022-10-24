import { IProject } from "src/store/module-project/state";
import { ITaskSuccess } from "src/store/module-task-success/state";
import { IUser } from "src/store/module-users/state";

export interface ITaskImageReject {
  _id: string;
  shortcode: string;
  status: string;
  new_result: any;
  user_id: string;
  task_success_id: string;
  project_id: string;
  approve_by: IUser;
  reject_by: IUser;
  approvedAt: string;
  createdAt: string;
  updatedAt: string;
  task_success: ITaskSuccess;
  project: IProject;
}

export interface IPagination {
  page: number;
  page_size: number;
  page_count: number;
  total: number;
}
