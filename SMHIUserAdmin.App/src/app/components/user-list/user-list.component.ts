import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as userActions from '../../store/actions/user.actions';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user.model'; 
import { AppState } from '../../state/app.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { WeatherService } from 'src/app/services/weather.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  
  users$: Observable<User[]> | undefined;
  showForm = false;
  userForm!: FormGroup;
  weatherData: { [userId: number]: any } = {};

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private router: Router,
    private weatherService: WeatherService
  ) {
    
    // Listen to the router's NavigationEnd event
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reloadUsers();
      }
    });
  }

  ngOnInit(): void {
    this.reloadUsers();
  }

  reloadUsers(): void {
    console.log('Fetching users from store');
    this.store.dispatch(userActions.loadUsers());
    this.users$ = this.store.select((state: AppState) => state.users.users);
  }
  
  fetchWeather(city: string, userId: number) {
    this.weatherService.fetchWeatherForCity(city)
      .pipe(
        catchError(error => {
          console.error('Error fetching weather:', error);
          return [];
        })
      )
      .subscribe((weather: any) => {
        console.log("Weather from Frontend User-list component" , weather);
        this.weatherData[userId] = weather;
      });
  }
  
  toggleForm() {
    this.showForm = !this.showForm;
  }

  onUserSubmit(userData: any) {
    console.log('Submitted data', userData);
    this.store.dispatch(userActions.addUser({ user: userData }));
    this.toggleForm();
  }

  deleteUser(userId: number) {
    console.log('UserId', userId);   
    this.store.dispatch(userActions.deleteUser({userId: userId}));
  }

  navigateToEditUser(userId: number): void {
    this.router.navigate(['/edit-user', userId]);
  }
}
