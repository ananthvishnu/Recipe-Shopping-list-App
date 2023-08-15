import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe; //? The recipe that is currently being displayed
  id?: number; //? The id of the currently selected recipe

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    //? Subscribe to route parameters to get the recipe id
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //? Extract the id from the parameters
      this.recipe = this.recipeService.getRecipe(this.id); //? Fetch the corresponding recipe
    });
  }
  //? Method to add the recipe's ingredients to the shopping list
  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  //? Method to navigate to the edit page for the current recipe
  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }
}
