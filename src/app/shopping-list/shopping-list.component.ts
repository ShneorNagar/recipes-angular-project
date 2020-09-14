import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[] = [
    new Ingredient("cheese", 1),
    new Ingredient("sugar", 1.5)
  ];

  constructor() { }

  ngOnInit(): void {
  }

  addItem(ingredientFromEdit: Ingredient) {
    this.ingredients.push(ingredientFromEdit);
  }
}
