import { type_media, type_status, type_user_role } from "./constants-type";

export interface IResultActions {
  sucess?: {
    value: string;
  };
  error?: {
    message: string;
  };
}

export interface IAPIErrorResponse {
  message: string;
}

export interface IBase {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUser extends IBase {
  email: string;
  role: type_user_role;
  status: type_status;
  username: string;
  password: string;
  loginErrorCount: number;
}

export interface IPanel extends IBase {
  userId: string;
  username: string;
  description: string;
  status: type_status;
}

export interface IMedia extends IBase {
  userId: string;
  mediaType: type_media;
  description: string;
  status: type_status;
  file: string;
}

export interface IMediaPanel extends IMedia {
  duration: number;
  order: number;
}

export interface IPanelMedia {
  panelId: string;
  mediaId: string;
  duration: number;
  order: number;
}
