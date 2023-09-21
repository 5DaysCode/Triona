import { usersReducer } from '../store/reducers/user.reducer';
import  {AppState} from './app.state';
import { ActionReducerMap } from '@ngrx/store';



export const appReducers: ActionReducerMap<AppState> = {
    users: usersReducer,  
  };

