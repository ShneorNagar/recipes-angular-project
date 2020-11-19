import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {HttpHandler} from '@angular/common/http';
import {HttpService} from '../shared/http.service';
import {AuthService} from '../auth/auth.service';
import {User} from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() recipesBtnEvent = new EventEmitter();
  @Output() shoppingListBtnEvent = new EventEmitter();

  collapsed: boolean;
  isAuthenticated: boolean;

  constructor(private httpService: HttpService,
              private auth: AuthService) { }

  ngOnInit(): void {
    this.collapsed = true;
    this.auth.userSub.subscribe((user: User) =>{
      this.isAuthenticated = !!user;
    })
  }

  saveAllRecipes() {
    this.httpService.saveAllRecipes()
      .subscribe(res =>{
        console.log(res)
      });
  }

  fetchAllRecipe() {
    this.httpService.fetchAllRecipes().subscribe();
  }

  logOut() {
    this.auth.logOut();
  }
}
