import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm!: NgForm;
  subscription!: Subscription;
  editMode = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;

  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
     //? Subscribe to the editing notifications from the service
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
         //? When an ingredient editing is initiated
        this.editedItemIndex = index;//? Store the index of the edited ingredient
        this.editMode = true;//? Set editing mode to true
        this.editedItem = this.slService.getIngredient(index);//? Get the edited ingredient from the service
        //? Populate the form with the edited ingredient's values
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value; //? Get the form input values
    const newIngredient = new Ingredient(value.name, value.amount); //? Create a new Ingredient object
    this.slService.addIngredient(newIngredient); //? Call the service to add the new ingredient
  }
  // Unsubscribe from the service to prevent memory leaks
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
