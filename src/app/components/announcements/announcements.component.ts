import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../service/announcement-service/announcement.service';
import { Observable } from 'rxjs';
import { Announcement } from '../../service/announcement-service/announcement.model';
import {
  createAnnouncement,
  loadAnnouncements,
} from '../../service/announcement-service/announcement.actions';
import { selectAnnouncements } from '../../service/announcement-service/announcement.reducer';
import { Store } from '@ngrx/store';
import { selectCurrentUserLocation } from '../../service/user-service/user.reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { SharedService } from '../../service/shared-service/shared.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css'],
})
export class AnnouncementsComponent implements OnInit {
  announcements$: Observable<Announcement[]> =
    this.store.select(selectAnnouncements);
  userLocation$ = this.store.select(selectCurrentUserLocation);
  userLocation: number = 0;
  expandedIds: Set<number> = new Set();

  //post announcement for admin/employee role
  announcementForm: FormGroup;
  //email notif when announcement posted v
  //maybe a crawler to gather some more announcement from sites like stb etc

  areas: string[] = [
    'General',
    'Bucuresti - Sector 1',
    'Bucuresti - Sector 2',
    'Bucuresti - Sector 3',
    'Bucuresti - Sector 4',
    'Bucuresti - Sector 5',
    'Bucuresti - Sector 6',
  ];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedAreas: string[] = [];

  constructor(
    private announcementService: AnnouncementService,
    public sharedService: SharedService,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      areaAffected: ['General', Validators.required],
    });
    this.userLocation$.subscribe((location) => {
      if (location)
        this.store.dispatch(loadAnnouncements({ payload: location }));
      this.userLocation = location || 0;
    });
  }

  ngOnInit(): void {
    //this.announcements$ = this.announcementService.getAnnouncements();

    this.announcements$.subscribe((res) => console.log(res));
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

  onSubmit() {
    if (this.announcementForm.valid) {
      console.log(this.announcementForm.value);
      this.store.dispatch(
        createAnnouncement({
          payload: this.announcementForm.value,
          userLocation: this.userLocation,
        }),
      );
    }
  }
}
