import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  //? An array to hold the ingredients for the shopping list
  ingredients!: Ingredient[];

  //? A subscription to manage the event stream for ingredient changes
  private subscription!: Subscription;

  //? Injecting the ShoppingListService into the component's constructor
  constructor(private slService: ShoppingListService) {}

  ngOnInit(): void {
    //? Initialize the ingredients array with the current list from the service
    this.ingredients = this.slService.getIngredients();

    //? Subscribe to the ingredientsChanged event to update the ingredients list
    //? whenever a change occurs in the service
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients; //? Update the ingredients array with the changed list
      }
    );
  }

  //? Method to handle editing an ingredient
  onEditItem(index: number) {
    
    //? Notify the service about the editing action
    this.slService.startedEditing.next(index);
  }

  //? Unsubscribe from the subscription when the component is destroyed
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
