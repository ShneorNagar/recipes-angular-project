import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Recipe} from './recipe.model';
import {Observable} from 'rxjs';
import {HttpService} from '../shared/http.service';
import {RecipeService} from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private recipesHttpService: HttpService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Recipe[]{
    if (this.recipesService.getRecipes().length === 0){
      return this.recipesHttpService.fetchAllRecipes();
    }else{
      return this.recipesService.getRecipes();
    }
  }
}
