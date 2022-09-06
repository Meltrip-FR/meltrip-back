import { DateAt } from "./Default";

export interface Tag extends DateAt {
  id: number;
  name: string;
  slug: string;
}
