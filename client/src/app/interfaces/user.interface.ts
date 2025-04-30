export interface User {
   id: number;
   name: string;
   contact_number: string;
   username: string;
   email: string;
   phone_number: string;
   is_super_admin?: boolean;
}