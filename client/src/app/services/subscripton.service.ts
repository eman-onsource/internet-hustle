import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import type { Subscription } from '../interfaces/subscription.interface';

@Injectable({
   providedIn: 'root'
})
export class SubscriptionService {

   constructor(private http: HttpClient) { }

   public getSubscriptions(): Observable<{ data: Subscription[] }> {
      return this.http.get<{ data: Subscription[] }>(`/api/subscriptions`);
   }
}
