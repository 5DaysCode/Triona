import { createAction, props } from '@ngrx/store';
import { User } from '../../interfaces/user.model';

export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction(
  '[User List] Load Users Success',
  props<{ users: User[] }>()
);

export const loadUsersError = createAction(
  '[User List] Load Users Error',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ userId: number }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ userId: number }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

export const addUser = createAction('[User] Add User', props<{ user: User }>());

export const addUserSuccess = createAction(
  '[User] Add User Success',
   props<{ user: User }>()
);
export const addUserFailure = createAction(
  '[User] Add User Failure',
   props<{ error: any }>()
);


export const loadUserById = createAction(
    '[User] Load User By ID',
    props<{ userId: number }>()
);

export const loadUserByIdSuccess = createAction(
    '[User] Load User By ID Success',
    props<{ selectedUser: User }>()
);

export const loadUserByIdError = createAction(
  '[User] Load User By ID Error',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);