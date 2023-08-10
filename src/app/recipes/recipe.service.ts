import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'Big Hamburger',
      'Indulge in pure satisfaction with our big hamburger - a culinary masterpiece that boasts succulent, flame-grilled beef enveloped in a fluffy, toasted brioche bun.',
      'https://th.bing.com/th/id/OIP.LjqAdBhV2ibXQ0ADZhAPnwHaE4?pid=ImgDet&rs=1',
      [new Ingredient('Buns', 2), new Ingredient('French chees', 3)]
    ),
    new Recipe(
      'Pepperoni Pizza',
      'Savor the timeless classic of our pepperoni pizza, where a golden, thin crust cradles a tantalizing blend of melted mozzarella and zesty tomato sauce.',
      'https://th.bing.com/th/id/R.5f90cb194e6a5c4d47d58e1be0b74de3?rik=8vzBq%2f7dZuiIBw&pid=ImgRaw&r=0',
      [new Ingredient('Pepperoni', 20), new Ingredient('Meat', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipe() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }
}
