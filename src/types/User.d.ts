export interface User {
  id?: number;
  userTag: string;
  username?: string;
  civility?: string;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  phone: string;
  confirmEmail: boolean;
  terms: boolean;
  newsletter: boolean;
}
