import type { Plan } from "./plan.interface";
import type { Subscription } from "./subscription.interface";

export interface Invoice {
   id: number;
   start_date: string;
   end_date: string;
   is_paid: boolean;
   subscription: Subscription;
}