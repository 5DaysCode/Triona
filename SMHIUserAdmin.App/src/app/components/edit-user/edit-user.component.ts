import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as userActions from '../../store/actions/user.actions';
import { User } from '../../interfaces/user.model';
import { AppState } from '../../state/app.state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userId: number | null = null;
  user$: Observable<User | undefined> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private routerredirect : Router 
  ) {}

  ngOnInit(): void {
    this.userId = +this.route.snapshot.paramMap.get('id')!; // Capture the passed 'id' parameter

    if (this.userId) {
      this.store.dispatch(userActions.loadUserById({ userId: this.userId }));
      this.user$ = this.store.select(state => state.users.selectedUser);
    }
  }

  onUserSubmit(updatedUserDetails: Partial<User>): void {
    if (this.userId) {
      const updatedUser = {
        id: this.userId,
        ...updatedUserDetails
      } as User;
      
    
      this.store.dispatch(userActions.updateUser({ user: updatedUser }));

      this.routerredirect.navigate(['/users'], { queryParams: { refresh: new Date().getTime() } });

      // this.routerredirect.navigate(['users']);
    }
  }
}
