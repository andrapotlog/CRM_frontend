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
  id: string;
  type: string;
  description: string;
  location: string;
  urgency: string;
  status: RequestStatusEnum;
  date: string;
}
