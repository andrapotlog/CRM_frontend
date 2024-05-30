import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from "../../service/announcement-service/announcement.service";
import {Observable,} from "rxjs";
import {Announcement} from "../../service/announcement-service/announcement.model";
import {loadAnnouncements} from "../../service/announcement-service/announcement.actions";
import {selectAnnouncements} from "../../service/announcement-service/announcement.reducer";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit{
  announcements$: Observable<Announcement[]> = this.store.select(selectAnnouncements);
  expandedIds: Set<number> = new Set();

  //post announcement for admin/employee role
  //email notif when announcement posted
  //maybe a crawler to gather some more announcement from sites like stb etc

  constructor(private announcementService: AnnouncementService, private store: Store) {
    /*this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });*/
    this.store.dispatch(loadAnnouncements());
  }

  ngOnInit(): void {
    //this.announcements$ = this.announcementService.getAnnouncements();

    this.announcements$.subscribe(res => console.log(res))
  }

  /*toggleContent(announcement: Announcement): void {
    console.log(announcement)
    announcement.expanded = !announcement.expanded;
  }*/

  toggleExpanded(id: number) {
    if (this.expandedIds.has(id)) {
      this.expandedIds.delete(id);
    } else {
      this.expandedIds.add(id);
    }
  }

  isExpanded(id: number): boolean {
    return this.expandedIds.has(id);
  }

  needsExpansion(content: string): boolean {
    return content.length > 300;
  }
}
