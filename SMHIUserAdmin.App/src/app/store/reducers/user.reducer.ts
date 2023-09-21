import { Action, createReducer, on } from '@ngrx/store';
import * as userActions from '../actions/user.actions';
import { User } from '../../interfaces/user.model';

export interface UsersState {
  users: User[];
  selectedUser?: User;  // Only User | undefined
  error?: any; // To handle any errors during the update
}

export const initialState: UsersState = {
  users: []
};

const _usersReducer = createReducer(
  initialState,
  
  on(userActions.loadUsersSuccess, (state, { users }) => ({ 
    ...state, 
    users: users.filter(Boolean)  // Remove null or undefined values 
  })),
  
  on(userActions.loadUsersError, state => ({ ...state, users: [] })),
  
  on(userActions.addUserSuccess, (state, { user }) => {
    if (!user) return state;  // Ensure user isn't null or undefined
    return {
      ...state,
      users: [...state.users, user]
    };
  }),
  
  on(userActions.deleteUserSuccess, (state, { userId }) => ({
    ...state,
    users: state.users.filter(user => user && user.id !== userId)
  })),
  
  on(userActions.loadUserByIdSuccess, (state, { selectedUser }) => ({
    ...state,
    selectedUser
  })),
  
  on(userActions.loadUserByIdError, state => ({
    ...state,
    selectedUser: undefined  // set to undefined instead of null
  })),

  on(userActions.updateUserSuccess, (state, { user }) => {
    if (!user) return state;
    return {
        ...state,
        users: state.users.map(u => u && user && u.id === user.id ? user : u)
    };
}),

  
  on(userActions.updateUserFailure, (state, { error }) => ({
    ...state,
    error
  }))
);

export function usersReducer(state: UsersState | undefined, action: Action) {
  return _usersReducer(state, action);
}
