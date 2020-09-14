import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Recipe} from '../../recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() recipe: Recipe;
  @Output() recipeToDisplay = new EventEmitter<Recipe>();

  display(recipeToDisplay: Recipe) {
    this.recipeToDisplay.emit(recipeToDisplay);
  }
}
