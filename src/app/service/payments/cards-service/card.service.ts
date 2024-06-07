import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CardInformation } from '../payment.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private apiUrl = 'http://localhost:6060/api/cards';

  constructor(private http: HttpClient) {}

  getCardsDetails(): Observable<CardInformation[]> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.get<any>(this.apiUrl, config);
  }

  saveCard(cardDetails: CardInformation): Observable<string> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const request = this.http.post<string>(this.apiUrl, cardDetails, config);

    request.subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );
    return request;
  }

  deleteCard(id: number) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.delete<void>(`${this.apiUrl}/${id}`, config);
  }
}
