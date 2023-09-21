import { User } from '../interfaces/user.model';

export interface UsersState {
  users: User[];
  selectedUser?: User;  // Optional because you might not always have a selected user
}

export interface AppState {
  users: UsersState;
}