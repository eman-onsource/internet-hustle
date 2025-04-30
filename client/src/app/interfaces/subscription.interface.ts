import type { Plan } from "./plan.interface";
import type { User } from "./user.interface";

export interface Subscription {
   id: number;
   start_date: string;
   is_active: boolean;
   plan: Plan;
   user: User;
}