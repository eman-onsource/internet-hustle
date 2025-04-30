import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invoice } from '../interfaces/invoice.interface';

export interface CreateRequestData {
   subscription_id: number;
   start_date: string;
   end_date: string;
}

@Injectable({
   providedIn: 'root'
})
export class InvoiceService {

   constructor(private http: HttpClient) { }

   public getInvoices(): Observable<{ data: Invoice[] }> {
      return this.http.get<{ data: Invoice[] }>(`/api/invoices`);
   }

   public createInvoice(requestData: CreateRequestData): Observable<{ data: Invoice }> {
      return this.http.post<{ data: Invoice }>(`/api/invoices`, requestData);
   }

   public pay(invoiceId: number): Observable<void> {
      return this.http.put<void>(`/api/invoices/${invoiceId}/pay`, {});
   }
}
