import { Profile } from "./Profile";
export interface Permission {
    _id?: string;
    route?: string;
    description?: string;
    profiles?: Profile[];
  }