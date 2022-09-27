export interface UserRole {
  id: number;
  name: string;
  slug: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
}
