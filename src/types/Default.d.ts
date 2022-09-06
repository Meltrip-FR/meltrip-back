export interface DateAt {
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export enum RolesList {
  "user",
  "moderator",
  "admin",
  toUpperCase,
}
