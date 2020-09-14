import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipes';
  isToDisplayRecipes: boolean = true;
  isToDisplayShoppingList: boolean = false;

  recipeBtnClicked() {
    this.isToDisplayShoppingList = false;
    this.isToDisplayRecipes = true;
  }

  shoppingListBtnClicked() {
    this.isToDisplayRecipes = false;
    this.isToDisplayShoppingList = true;
  }
}
