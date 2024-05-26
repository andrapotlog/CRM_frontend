import {Component, OnInit} from '@angular/core';
import {AnnouncementService} from "../../service/announcement-service/announcement.service";
import {Observable, of} from "rxjs";
import {Announcement} from "../../service/announcement-service/announcement.model";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent implements OnInit{
  announcements$: Observable<Announcement[]> = of([]);

  //post announcement for admin/employee role
  //email notif when announcement posted
  //maybe a crawler to gather some more announcement from sites like stb etc

  constructor(private announcementService: AnnouncementService) {
    /*this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });*/
  }

  ngOnInit(): void {
    this.announcements$ = this.announcementService.getAnnouncements();

    this.announcements$.subscribe(res => console.log(res))
  }

  toggleContent(announcement: Announcement): void {
    announcement.expanded = !announcement.expanded;
  }
}
