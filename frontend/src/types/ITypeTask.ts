export interface IGetAllTaskRes {
  status: string;
  data: IGetTaskDetail[];
  total: number;
  totalPages: number;
}

export interface IGetTaskDetail {
  _id?: string;
  title?: string;
  description: string;
  status: string;
  deadline: Date;
  priority: string;
  userId?: string;
}
export interface ITaskCreate {
  title: string;
  description: string;
  status: string;
  deadline: Date;
  priority: string;
}

export interface ISearchData {
  status: string;
  data: ISearch[];
}

export interface ISearch {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: ISearchSource;
}

export interface ISearchSource {
  title: string;
  description: string;
  status: string;
  deadline: Date;
  priority: string;
  userId: string;
}
