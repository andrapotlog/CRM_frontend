export enum PriorityEnum {
  critical = 'Critical',
  high = 'High',
  medium = 'Medium',
  low = 'Low',
}

export enum RequestStatusEnum {
  pending = 'Pending',
  inProgress = 'In Progress',
  completed = 'Completed',
  rejected = 'Rejected',
}

export interface ServiceRequestModel {
  id?: number;
  type: number;
  description: string;
  location: number;
  address: string;
  priority: PriorityEnum;
  status?: RequestStatusEnum;
  creationDate?: string;
  updateDate?: string;
  observations: string;
  createdByUser?: number;
}
