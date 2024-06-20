import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Payment } from '../payment.model';
import { Observable } from 'rxjs';
import saveAs from 'file-saver';
import { environment } from '../../../../enviroments/enviroment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  // private apiUrl = 'http://localhost/api/payments';
  // private apiUrl = 'http://localhost:6060/api/payments';
  private apiUrl = environment.apiEndpoints.paymentService;

  constructor(private http: HttpClient) {}

  getPayments(): Observable<Payment[]> {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    return this.http.get<Payment[]>(this.apiUrl, config);
  }

  savePayment(payment: Payment) {
    const token = JSON.parse(localStorage.getItem('token')!);
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
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
    return this.http.get<Payment>(`${this.apiUrl}/${id}`, config);
  }

  getInvoice(invoiceId: string): Observable<Blob> {
    const headers = new HttpHeaders({ Accept: 'application/pdf' });
    return this.http.get(`${this.apiUrl}/invoice/${invoiceId}`, {
      headers,
      responseType: 'blob',
    });
  }

  downloadInvoice(invoiceId: string): void {
    this.getInvoice(invoiceId).subscribe((blob) => {
      saveAs(blob, `invoice-${invoiceId}.pdf`);
    });
  }
}
