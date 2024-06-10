import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Announcement } from './announcement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private apiUrl = 'http://localhost:7070/api/announcements';

  /* announcements: Announcement[] = [
     {
       id: 1,
       title: 'No hot water',
       content: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
       createdAt: '22/05/2024T12:00',
       expanded: false
     },
     {
       id: 2,
       title: 'Public transportation blocked at address',
       content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
       createdAt: '21/05/2024T21:00',
       expanded: false
     }
   ]*/

  constructor(private http: HttpClient) {}

  getAnnouncements(location: number): Observable<Announcement[]> {
    //return of(this.announcements);
    const token = JSON.parse(localStorage.getItem('token')!);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    let params = new HttpParams();

    if (location) {
      params = params.set('location', location);
    }

    console.log(params);

    return this.http.get<Announcement[]>(this.apiUrl, { headers, params });
  }

  createAnnouncement(announcement: Announcement) {
    //this.announcements.unshift(announcement);
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    console.log(announcement);

    return this.http.post<Announcement>(this.apiUrl, announcement, config);
  }
}
