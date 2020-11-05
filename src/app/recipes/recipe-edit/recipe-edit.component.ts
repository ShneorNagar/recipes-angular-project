import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
import {Ingredient} from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  isEditMode: boolean;
  form: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = +params['id'];
      this.isEditMode = params['id'] != null;
      this.initForm();
      console.log(this.isEditMode)
    });
  }

  private initForm(){

    let recipeName = '';
    let imageUrl = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.isEditMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imageUrl = recipe.imageUrl;
      description = recipe.description;
      if(recipe.ingredients.length > 0){
        for(let ing of recipe.ingredients){
          ingredients.push(new FormGroup({
            'name': new FormControl(ing.name, Validators.required),
            'amount': new FormControl(ing.amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }
      }
    }

    this.form = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imageUrl': new FormControl(imageUrl, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    })
  }

  getIngFormGroup(){
    return this.form.get('ingredients')['controls'];
  }

  onSubmit() {
    const form = this.form;
    const name: string = form.value.name;
    const description: string = form.value.description;
    const imageUrl: string = form.value.imageUrl;
    const ingredients: Ingredient[] = form.value.ingredients;
    const newRecipe = new Recipe(this.id, name, description, imageUrl, ingredients)

    if (this.isEditMode){
      this.recipeService.updateRecipe(this.id, newRecipe)
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
  }

  addIngredient() {
    (<FormArray>this.form.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }
}
