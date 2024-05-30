import {Announcement} from "../../service/announcement-service/announcement.model";

export class AnnouncementMapper {
  static mapAnnouncement(announcement: Announcement): Announcement {
    return {
      ...announcement,
   // expanded: false
    }
  }

  static mapAnnouncements(announcements: Announcement[]): Announcement[] {
    return announcements.map(e => this.mapAnnouncement(e))
  }
}
