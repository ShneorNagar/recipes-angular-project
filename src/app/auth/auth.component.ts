import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponse, UsersService} from './users.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLogInMode: boolean = true;
  isLoading: boolean;
  error: string;

  constructor(private usersService: UsersService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  switchMode() {
    this.isLogInMode = !this.isLogInMode;
  }

  onSubmit(form: NgForm) {

    this.isLoading = true;
    this.error = null;

    let email = form.value.email;
    let password = form.value.password;
    console.log(form.value);

    /**
     * Two functions are returning (almost) same result and doing same data manipulation
     * so to reduce code, we store the response in Observable and execute the (same)
     * logic with the data shipped with the calling function
     */

    let authSubs: Observable<AuthResponse>;
    if (this.isLogInMode) {
      authSubs = this.usersService.signIn(email, password);
    } else {
      authSubs = this.usersService.signUp(email, password);
    }

    authSubs.subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        this.router.navigate(['/recipes'], {relativeTo: this.route}).then(res =>{
        }).catch(err =>{
          console.log(err)
        })
      },
      (errMessage) => {
        this.error = errMessage;
        console.log(errMessage);
        this.isLoading = false;
      });

    form.reset();
  }

}
