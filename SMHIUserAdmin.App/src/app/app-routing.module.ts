import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

const routes: Routes = [
        { path: '' , redirectTo: '/welcome' , pathMatch: 'full' },
        { path: 'welcome' , component:  WelcomeComponent},
         {path : 'users' , component: UserListComponent},
        {
          path: 'edit-user/:id',
          component: EditUserComponent
        }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
