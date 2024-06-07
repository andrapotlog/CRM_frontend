import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Payment } from '../payment.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = 'http://localhost:6060/api/payments';

  /*cards: CardInformation[] = [
    {
      id: 1,
      number: '4111111111111111',
      expiration: '12/24',
      cardType: 'VISA',
      ownerName: 'John Doe',
      savedByUserId: 4,
    },
    {
      id: 2,
      number: '1234567891002222',
      expiration: '05/26',
      cardType: 'VISA',
      ownerName: 'John Doe',
      savedByUserId: 4,
    },
  ];

  templates: Template[] = [
    {
      id: 1,
      recipientName: 'Public Institution',
      recipientAccountNumber: '987654321',
      templateName: 'Taxes',
      createdByUserId: 4,
    },
    {
      id: 2,
      recipientName: 'Hidroelectrica',
      recipientAccountNumber: '555555555',
      templateName: 'Water',
      createdByUserId: 4,
    },
  ];

  payments: Payment[] = [
    {
      id: 2,
      recipientName: 'Hidroelectrica',
      recipientAccountNumber: '11111111',
      billNumber: 'WBILL232321',
      amount: 35,
      description: 'Water bill',
      dateAndTime: '05-25-2024',
      card: {
        id: 1,
        number: '4111111111111111',
        expiration: '12/24',
        cardType: 'VISA',
        ownerName: 'John Doe',
        savedByUserId: 4,
      },
      invoiceId: 'INV54321',
      payerUserId: 4,
    },
    {
      id: 1,
      recipientName: 'Public Institution',
      recipientAccountNumber: '555555555',
      billNumber: 'BILL12345',
      amount: 100,
      description: 'Tax payment',
      dateAndTime: '05-01-2024',
      card: {
        id: 1,
        number: '4111111111111111',
        expiration: '12/24',
        cardType: 'VISA',
        ownerName: 'John Doe',
        savedByUserId: 4,
      },
      invoiceId: 'INV12345',
      payerUserId: 4,
    },
  ];*/

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    // console.log(this.payments);
    // return of(this.payments);
    return this.http.get<Payment[]>(this.apiUrl, config);
  }

  savePayment(payment: Payment) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //this.payments.push(payment);
    //return of(this.payments);
    console.log(payment);
    const request = this.http.post(this.apiUrl, payment, config);

    request.subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      },
    );

    return request;
  }

  getPaymentById(id: number): Observable<Payment> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    //this.payments = this.payments.filter((p) => p.id !== id);
    // return this.http.delete<void>(`${this.apiUrl}/${id}`);
    return this.http.get<Payment>(`${this.apiUrl}/${id}`, config);
  }

  async getInvoice(invoiceId: string) {
    console.log('invoice ' + invoiceId);
    /*this.http
      .get(`${this.apiUrl}/${invoiceId}`, {
        responseType: 'blob',
        headers: new HttpHeaders().append('Content-Type', 'application/pdf'),
      })
      .subscribe((pdfBlob: Blob) => {
        saveAs(pdfBlob, `invoice_${invoiceId}.pdf`);
      });*/
  }
}
