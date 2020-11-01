import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [];
  ingredientAdded = new Subject<Ingredient[]>();
  selectedItemToEdit = new Subject<number>();
  updatedIngredient = new Subject<UpdateIngredient>();

  constructor() { }

  addIngredient(ingredient: Ingredient): void{
    this.ingredients.push(ingredient);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  updateIngredient(ingredient: Ingredient, index: number){
    this.ingredients[index] = ingredient;
    let ing = {
      ingredient: this.ingredients[index],
      index: index
    }
    this.updatedIngredient.next(ing);
  }

  getIngredient(index: number){
    return this.ingredients[index];
  }

  getIngredients(){
    return this.ingredients.slice();
  }

  updateIngredients(ingredients: Ingredient[]){
    this.ingredients.push(...ingredients);
    this.ingredientAdded.next(this.ingredients.slice());
  }

  deleteIngredient(index: number){
    this.ingredients.splice(index, 1);
    this.ingredientAdded.next(this.ingredients.slice());
  }
}

export interface UpdateIngredient{
  ingredient: Ingredient,
  index: number
}
