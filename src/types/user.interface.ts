export interface User {
  _id: string;
  fullName: string;
  email: string;
  password: string;
  role: Roles;
}

export type Roles = "Admin" | "Moderator" | "Editor" | "Viewer";
