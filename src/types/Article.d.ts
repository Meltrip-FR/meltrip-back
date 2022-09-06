import { DateAt } from "./Default";

export interface Article extends DateAt {
  id: number;
  title: string;
  description: string;
  text: string;
  slug: string;
  status: boolean;
  authorId: number;
  tagId: number;
}
