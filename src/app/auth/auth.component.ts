import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthResponse, AuthService} from './auth.service';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertComponent} from '../alert/alert.component';
import {PlaceholderDirective} from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLogInMode: boolean = true;
  isLoading: boolean;
  error: string;
  alertCloseSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

  constructor(private usersService: AuthService,
              private router: Router,
              private route: ActivatedRoute,
              private compFactoryResolver: ComponentFactoryResolver) {
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
        this.router.navigate(['/recipes'], {relativeTo: this.route}).then(res => {
        }).catch(err => {
          console.log(err);
        });
      },
      (errMessage) => {
        this.error = errMessage;
        console.log(errMessage);
        this.createAlertComponent(errMessage);
        this.isLoading = false;
      });

    form.reset();
  }

  onClose() {
    this.error = null;
  }

  createAlertComponent(error: string) {
    const alertComponentFactory = this.compFactoryResolver.resolveComponentFactory(AlertComponent);
    const alertCompViewChildRef = this.alertHost.viewContainerRef;
    alertCompViewChildRef.clear();
    const alertComponentRef = alertCompViewChildRef.createComponent(alertComponentFactory);

    alertComponentRef.instance.message = error;
    const alertCloseSub = alertComponentRef.instance.close.subscribe(()=>{
      alertCompViewChildRef.clear();
      if (this.alertCloseSub){
        this.alertCloseSub.unsubscribe();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.alertCloseSub){
      this.alertCloseSub.unsubscribe();
    }
  }
}
