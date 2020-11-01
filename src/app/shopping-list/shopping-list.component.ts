import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[] = [];
  private ingredientsSubscription: Subscription;
  updatedIngredientSubs: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsSubscription = this.shoppingListService.ingredientAdded
      .subscribe((ingredients) =>{
      this.ingredients = ingredients;
    })

    this.updatedIngredientSubs = this.shoppingListService.updatedIngredient
      .subscribe((ingredient) => {
        this.ingredients[ingredient.index] = ingredient.ingredient;
      })
  }
  
  ngOnDestroy(): void {
    this.ingredientsSubscription.unsubscribe();
    this.updatedIngredientSubs.unsubscribe();
  }

  onEditItem(index: number) {
    this.shoppingListService.selectedItemToEdit.next(index)
  }
}
