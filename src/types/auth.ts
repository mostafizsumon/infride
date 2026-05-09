export enum UserRole {
  ADMIN = 'Admin',
  USER = 'User'
}

export interface UserProfile {
  uid: string;
  email: string;
  fullName: string;
  role: UserRole;
  photoURL?: string;
}
