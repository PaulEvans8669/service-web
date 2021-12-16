import { Component, OnInit } from '@angular/core';
import {map, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Loan} from '../model/loan';
import {LoanService} from '../services/loan.service';
import {UserService} from '../services/user.service';
import {CopyService} from '../services/copy.service';

@Component({
  selector: 'app-loan-list',
  templateUrl: './loan-list.component.html',
  styleUrls: ['./loan-list.component.css']
})
export class LoanListComponent implements OnInit {
  public loans$: Observable<(Loan)[]>;

  constructor(private loanService: LoanService,
              private userService: UserService,
              private copyService: CopyService) { }

  ngOnInit() { this.init(); }

  public init() {
    this.loans$ = this.loanService.getAll()
        .pipe(
            tap(this.addUsers.bind(this)),
            tap(this.addCopies.bind(this))
        );
  }

  public unloan(id: string) {
    this.loanService.unloan(id).subscribe(() => {
      this.loans$ = this.loans$.pipe(
          map((loans) => loans.filter((loan) => loan.id !== id))
      );
    });
  }

  private addUsers(loans: Loan[]) {
    for (const loan of loans) {
      this.userService.get(loan.userId)
          .pipe(
              map(user => loan.userId = user.name)
          )
          .subscribe();
    }
  }

  private addCopies(loans: Loan[]) {
    for (const loan of loans) {
      this.copyService.getBookForCopy(loan.copyId)
          .pipe(
              map(book => loan.copyId = `${book.name} by ${book.author}`)
          )
          .subscribe();
    }
  }
}
