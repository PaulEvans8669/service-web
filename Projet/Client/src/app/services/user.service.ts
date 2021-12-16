import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { BaseHttpService } from './baseHttpService';
import {UserCreationDto} from '../model/user-creation-dto';
import {map} from 'rxjs/operators';

@Injectable()
export class UserService extends BaseHttpService {

  public getAll(): Observable<User[]> {
    return this.http
        .get<User[]>(`${this.baseUrl}/users`);
  }

  public get(userId: string): Observable<User> {
    return this.http
        .get<User>(`${this.baseUrl}/users/${userId}`);
  }

  public create(userCreationDto: UserCreationDto): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, userCreationDto);
  }

  public delete(userId: string): Observable<void> {
    return this.http.delete(`${this.baseUrl}/users/${userId}`)
        .pipe(map(() => null));
  }
}
