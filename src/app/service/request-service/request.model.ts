export enum PriorityEnum {
  critical = 'Critical',
  high = 'High',
  medium = 'Medium',
  low = 'Low'
}

export enum RequestStatusEnum {
  pending = 'Pending',
  inProgress = 'In Progress',
  completed = 'Completed',
  rejected = 'Rejected'
}

export interface ServiceRequestModel {
  id?: number;
  type: string;
  description: string;
  location: string;
  priority: PriorityEnum;
  status?: RequestStatusEnum;
  date?: string;
  created_by_user: number;
  city: string;
  street: string;
}
