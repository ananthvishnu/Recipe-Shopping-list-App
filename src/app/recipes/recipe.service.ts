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
      'https://s-media-cache-ak0.pinimg.com/originals/c9/57/80/c957805c620f8ec9ffe7e365674dc659.jpg',
      [new Ingredient('Buns', 2), new Ingredient('French chees', 3)]
    ),
    new Recipe(
      'Pepperoni Pizza',
      'Savor the timeless classic of our pepperoni pizza, where a golden, thin crust cradles a tantalizing blend of melted mozzarella and zesty tomato sauce.',
      'https://th.bing.com/th/id/R.5f90cb194e6a5c4d47d58e1be0b74de3?rik=8vzBq%2f7dZuiIBw&pid=ImgRaw&r=0',
      [new Ingredient('Pepperoni', 20), new Ingredient('Meat', 1)]
    ),
    new Recipe(
      'Hot Dog',
      'Hot dogs are prepared commercially by mixing the ingredients (meats, spices, binders and fillers) in vats where rapidly moving blades grind and mix the ingredients',
      'https://purepng.com/public/uploads/large/purepng.com-hot-dogfood-salad-hotdog-sausage-sandwich-ketchup-9415246184411sj9v.png',
      [new Ingredient('Sausages', 1), new Ingredient('Sliced Bun', 1)]
    ),
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
}
