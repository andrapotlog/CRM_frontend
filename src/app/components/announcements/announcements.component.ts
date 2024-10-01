import { Component, OnInit } from '@angular/core';
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

  constructor(
    public sharedService: SharedService,
    private store: Store,
    private fb: FormBuilder,
  ) {
    this.announcementForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      areaAffected: ['General', Validators.required],
    });
    this.store.dispatch(loadAnnouncements({ payload: 0 }));
    this.userLocation$.subscribe((location) => {
      if (location)
        this.store.dispatch(loadAnnouncements({ payload: location }));
      this.userLocation = location || 0;
    });
  }

  ngOnInit(): void {}

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
    this.store.dispatch(loadAnnouncements({ payload: this.userLocation }));
  }
}
