import { User } from "../entities";

export interface UserBulkRes {
  payload: User[],
  count: number,
  status: string,
  msg?: string,
}