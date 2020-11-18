import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipesComponent} from './recipes/recipes.component';
import {ShoppingListComponent} from './shopping-list/shopping-list.component';
import {RecipeDetailComponent} from './recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './recipes/recipe-edit/recipe-edit.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {RecipeStartComponent} from './recipes/recipe-start/recipe-start.component';
import {RecipesResolverService} from './recipes/recipes-resolver.service';
import {AuthComponent} from './auth/auth.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/recipes', pathMatch: 'full'},
  {
    path: 'recipes', component: RecipesComponent, children: [
      {
        path: '', component: RecipeStartComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: 'new', component: RecipeEditComponent},
      {
        path: ':id', component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit', component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  {path: 'shoppingList', component: ShoppingListComponent},
  {path: 'auth', component: AuthComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    // useHash marking the URL for the server. to give the parsing HTML job to the client side
    // RouterModule.forRoot(appRouts, {useHash: true})
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouting {

}
