export interface IProject {
  _id: string;
  project_name: string;
  project_desc: string;
  project_type: ProjectType;
  label_type: ProjectLabelType;
  image_type: ProjectImageType;
  base_image_url: string;
  label_count: number;
  price_image: number;
  require_custom: boolean;
  custom_attribute: ICustomAttribute[];
  config_input: IProjectConfigInput;
  process: ProjectProcess;
  project_owner: string;
  createdAt: Date;
  updatedAt: Date;
  update_by: string;
}

export enum ProjectType {
  IMAGE = "image",
  TEXT = "text",
}

export enum ProjectLabelType {
  ANNOTATION = "annotation",
  LABELLING = "labelling",
  CLASSIFICATION = "classification",
}

export enum ProjectProcess {
  DOING = "doing",
  SUCCESS = "success",
  PAUSE = "pause",
}

export enum ProjectImageType {
  JPG = "jpg",
  JPEG = "jpeg",
  PNG = "png",
}

export interface IProjectConfigInput {
  annotation?: IAnnotationConfigInput[];
  labelling?: ILabellingConfigInput[];
  classification?: IClassificationConfigInput[];
}

export interface IAnnotationConfigInput {}

export interface ILabellingConfigInput {
  display_name: string;
  value: string;
}

export interface IClassificationConfigInput {
  display_name: string;
  value: string;
}

export interface ICustomAttribute {
  display_name: string;
  value: string;
}

export interface IProjectState {
  projects: IProject[];
}

const projectState = (): IProjectState => {
  return {
    projects: [] as IProject[],
  };
};

export default projectState;
