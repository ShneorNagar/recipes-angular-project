import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Recipe} from '../recipes/recipe.model';
import {RecipeService} from '../recipes/recipe.service';
import {Observable} from 'rxjs';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {UsersService} from '../auth/users.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private DB_RECIPE_FOLDER = 'recipes';
  private DB_RECIPES_ROOT_FOLDER_PATH = `https://ng-recipes-7df4d.firebaseio.com/${this.DB_RECIPE_FOLDER}.json`;

  constructor(private http: HttpClient,
              private recipesService: RecipeService,
              private auth: UsersService) {
  }

  // will override all existing recipes in DB
  saveAllRecipes(): Observable<any> {
    return this.http.put(this.DB_RECIPES_ROOT_FOLDER_PATH, this.recipesService.getRecipes());
  }

  saveRecipe(recipeId: number) {

  }

  updateRecipe(recipeId: number, recipe: Recipe) {

  }

  updateRecipes(recipesIds: number[], recipes: Recipe[]) {

  }

  fetchRecipe(recipeId: number) {
    // return this.http.get(this.DB_RECIPES_ROOT_FOLDER_PATH + '/' + recipeId);
  }

  /***
   * 1. get user data from auth
   * 2. after complete - pass the value to nested observable
   * 3. get recipes from database (with token from parent observable)
   */
  fetchAllRecipes() {
      return this.http.get<Recipe[]>(this.DB_RECIPES_ROOT_FOLDER_PATH).pipe(map((recipes: Recipe[]) => {
        recipes.forEach(recipe => {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        });
        return recipes;
      }), tap((recipes: Recipe[]) => {
        this.recipesService.setRecipes(recipes);
      }));
    }

  deleteRecipe(recipeId: number) {

  }

  deleteRecipes(recipesIds: number[]) {

  }
}
