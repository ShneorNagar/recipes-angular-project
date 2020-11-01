import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list.service';
import {Form, NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  ADD_BTN = 'Add';
  UPDATE_BTN = 'Update';
  editMode: boolean;
  itemIndex: number;
  editedItem: Ingredient;
  selectedItemSubs: Subscription;

  @ViewChild('form', {static: false}) form: NgForm;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.selectedItemSubs = this.shoppingListService.selectedItemToEdit
      .subscribe((index: number) => {
        this.editMode = true;
        this.itemIndex = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });


  }

  addOrUpdateItem(form: NgForm) {
    const formValues = form.value;
    const ingredient = new Ingredient(formValues.name, formValues.amount);

    !this.editMode ?
      this.shoppingListService.addIngredient(ingredient) :
      this.shoppingListService.updateIngredient(ingredient, this.itemIndex);

    form.reset();
    this.editMode = false;
  }

  delete() {
    this.shoppingListService.deleteIngredient(this.itemIndex);
    this.form.reset();
    this.editMode = false;
  }

  clear() {
    this.form.reset();
    this.editMode = false;
  }

  ngOnDestroy(): void {
    this.selectedItemSubs.unsubscribe();
  }
}
