import { DateAt } from "./Default";

export interface Contact extends DateAt {
  id: number;
  username: string;
  title: string;
  describe: string;
}
