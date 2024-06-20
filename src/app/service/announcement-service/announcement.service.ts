import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Announcement } from './announcement.model';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  private apiUrl = environment.apiEndpoints.announcementsService;
  // private apiUrl = 'http://localhost/api/announcements';
  // private apiUrl = 'http://localhost:7070/api/announcements';

  constructor(private http: HttpClient) {}

  getAnnouncements(location: number): Observable<Announcement[]> {
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
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    return this.http.post<Announcement>(this.apiUrl, announcement, config);
  }
}
