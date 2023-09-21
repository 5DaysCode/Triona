import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../interfaces/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private apiUrl = `${environment.apiUrl}User`;

  constructor(private httpClient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.apiUrl);
  }


  getUserById(userId: number): Observable<User> {
    console.log(`Fetching user with ID: ${userId}`); 
    
    return this.httpClient.get<User>(`${this.apiUrl}/${userId}`)
      .pipe(
        tap(user => console.log('Received user data:', user))
      );
}

  addUser(user: User): Observable<User> {
     
    console.log('Sending User Data:', user); 

    return this.httpClient.post<User>(this.apiUrl, user);
  }

  updateUser(user: User): Observable<User> {
   
    return this.httpClient.put<User>(`${this.apiUrl}/${user.id}`, user);
  }

  deleteUser(userId: number): Observable<{}> {
    
    return this.httpClient.delete(`${this.apiUrl}/${userId}`);
  }
}
