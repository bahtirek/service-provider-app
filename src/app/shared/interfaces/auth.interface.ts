import { User } from "./user.interface";

export interface AuthUser {
  accessToken?: string;
  user?: User;
}
