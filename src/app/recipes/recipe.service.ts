import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  selectedItem = new Subject<Recipe>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  private recipes: Recipe[] = [
    new Recipe(0,
      'Toast',
      'Tasty toast',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQiTcaEPpbEFjK71Ezb17v7AwP64ThIFoFSFQ&usqp=CAU',
      [new Ingredient('cheese', 1),
        new Ingredient('Tomato', 1)]),
    new Recipe(1,
      'soap',
      'adi soap',
      'data:image/jpeg;base64,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',
      [new Ingredient('potato', 1),
        new Ingredient('Tomato', 1)]),
  ];

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(id: number){
    return this.recipes.find((recipe) => recipe.id === id);
  }

  sendIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.updateIngredients(ingredients);
  }
}
