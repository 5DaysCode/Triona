

import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as userActions from '../actions/user.actions';
import { UserService } from '../../services/userService.service';

@Injectable()
export class UserEffects {

    loadUsers$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.loadUsers),
        mergeMap(() => this.userService.getUsers()
            .pipe(
                map(users => userActions.loadUsersSuccess({ users })),
                catchError(error => of(userActions.loadUsersError({ error })))
            ))
    ));

    deleteUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.deleteUser),
        mergeMap(action => this.userService.deleteUser(action.userId)
            .pipe(
                map(() => userActions.deleteUserSuccess({ userId: action.userId })),
                catchError(error => of(userActions.deleteUserFailure({ error })))
            ))
    ));

    addUser$ = createEffect(() => this.actions$.pipe(
        ofType(userActions.addUser),
        mergeMap(({ user }) => this.userService.addUser(user) // Destructured here
            .pipe(
                map(newUser => userActions.addUserSuccess({ user: newUser })),
                catchError(error => of(userActions.addUserFailure({ error })))
            ))
    ));

  
    loadUserById$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.loadUserById),
            mergeMap(action => this.userService.getUserById(action.userId)
                .pipe(
                    map(user => userActions.loadUserByIdSuccess({ selectedUser: user })),
                    catchError(error => of(userActions.loadUserByIdError({ error })))
                )
            )
        )
    );

  
    updateUser$ = createEffect(() =>
        this.actions$.pipe(
            ofType(userActions.updateUser),
            mergeMap(({ user }) => this.userService.updateUser(user)
                .pipe(
                    map(updatedUser => userActions.updateUserSuccess({ user: updatedUser })),
                    catchError(error => of(userActions.updateUserFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private userService: UserService
    ) {}
}
