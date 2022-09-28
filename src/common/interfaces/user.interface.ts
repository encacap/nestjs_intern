export interface UserRoleInterface {
  id: number;
  name: string;
  slug: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  roles: UserRoleInterface[];
}
