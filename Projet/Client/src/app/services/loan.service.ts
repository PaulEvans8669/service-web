import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { BaseHttpService } from './baseHttpService';
import {Loan} from '../model/loan';

@Injectable()
export class LoanService extends BaseHttpService {
  public getAll(): Observable<Loan[]> {
    return this.http
        .get<Loan[]>(`${this.baseUrl}/loans`);
  }

  public loan(copyId, userId): Observable<void> {
    return this.http.post(`${this.baseUrl}/loans`, {copyId, userId}) // no need for loanDate, the API puts a default one
      .pipe(
        map(() => null),
        catchError((err) => { console.log(err); return null; })
      );
  }

  public unloan(loanId): Observable<void> {
    return this.http.delete(`${this.baseUrl}/loans/${loanId}`)
        .pipe(map(() => null));
  }
}
