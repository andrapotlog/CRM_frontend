export interface Announcement {
  id?: number;
  title: string;
  content: string;
  creationDate?: string;
  status?: AnnouncementStatusEnum;
  authorId?: number;
  areaAffected?: string;
  category?: string;
}

export enum AnnouncementStatusEnum {
  active = 'active',
  inactive = 'inactive',
  done = 'done',
  undefined = 'undefined'
}
