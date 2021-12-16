import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../model/user';
import {FormBuilder, Validators} from '@angular/forms';
import {UserCreationDto} from '../model/user-creation-dto';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  public users: User[];

  public userCreationForm = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
  });

  constructor(private userService: UserService,
              private fb: FormBuilder) { }

  ngOnInit() { this.init(); }

  public init() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    });
  }

  public createUser() {
    const formData: UserCreationDto = this.userCreationForm.value;
    this.userService.create(formData)
        .pipe(first())
        .subscribe((user) => {
          this.users = [...this.users, user];
        });
  }

  deleteUser(id: string) {
    this.userService.delete(id)
        .pipe(first())
        .subscribe(() => {
          this.users = this.users.filter(u => u.id !== id);
        });
  }
}
