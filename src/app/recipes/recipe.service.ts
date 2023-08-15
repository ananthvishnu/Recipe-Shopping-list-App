import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  //? Array to store predefined recipes
  private recipes: Recipe[] = [
    //? Recipe 1: Big Hamburger
    new Recipe(
      'Big Hamburger',
      'Indulge in pure satisfaction with our big hamburger - a culinary masterpiece that boasts succulent, flame-grilled beef enveloped in a fluffy, toasted brioche bun.',
      'https://s-media-cache-ak0.pinimg.com/originals/c9/57/80/c957805c620f8ec9ffe7e365674dc659.jpg',
      [new Ingredient('Buns', 2), new Ingredient('French chees', 3)]
    ),
    //? Recipe 2: Pepperoni Pizza
    new Recipe(
      'Pepperoni Pizza',
      'Savor the timeless classic of our pepperoni pizza, where a golden, thin crust cradles a tantalizing blend of melted mozzarella and zesty tomato sauce.',
      'https://th.bing.com/th/id/R.5f90cb194e6a5c4d47d58e1be0b74de3?rik=8vzBq%2f7dZuiIBw&pid=ImgRaw&r=0',
      [new Ingredient('Pepperoni', 20), new Ingredient('Meat', 1)]
    ),
    //? Recipe 3: Hot Dog

    new Recipe(
      'Hot Dog',
      'Hot dogs are prepared commercially by mixing the ingredients (meats, spices, binders and fillers) in vats where rapidly moving blades grind and mix the ingredients',
      'https://purepng.com/public/uploads/large/purepng.com-hot-dogfood-salad-hotdog-sausage-sandwich-ketchup-9415246184411sj9v.png',
      [new Ingredient('Sausages', 1), new Ingredient('Sliced Bun', 1)]
    ),
    //? Recipe 4: Rice & Curry

    new Recipe(
      'Rice & Curry',
      'Sri Lankan Rice and Curry Considered the national dish of the country, Sri Lankan rice and curry consists of steaming hot and spicy chicken curry tasty food',
      'https://th.bing.com/th/id/R.70b9d56d2971301e39b9ee70ed760399?rik=RefAeFCbJRwszA&riu=http%3a%2f%2fstatic.takeaway.com%2fimages%2fcats%2fm51.png%3fOrder%2bIndian%2bfood&ehk=I5rifjuJ9or0GXo68vvx1x83HLCTVwCH%2fOlceZoLyLQ%3d&risl=&pid=ImgRaw&r=0',
      [new Ingredient('Rice', 1), new Ingredient('Chicken', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  //? Returns a copy of the recipes array
  getRecipes() {
    return this.recipes.slice();
  }

  //? Returns the recipe at the specified index
  getRecipe(index: number) {
    return this.recipes[index];
  }

  //? Adds the provided ingredients to the shopping list
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
