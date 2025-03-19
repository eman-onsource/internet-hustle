export interface Reading {
   id: number;
   user_id: number;
   month: string;
   reading: string;
   consumption: string;
   amount: string;
   status: string;
   payment_status: string;
   notification_status: string;
   created_at: string;
   updated_at: string;
   payment_processed_by: string;
   notes?: any

   showEditBtn?: boolean;
   showPayBtn?: boolean;
   showCollectBtn?: boolean;
}