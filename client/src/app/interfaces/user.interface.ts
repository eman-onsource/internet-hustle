export interface User {
   id: number;
   name: string;
   email: string;
   phone_number: string;
   is_super_admin?: boolean;
}