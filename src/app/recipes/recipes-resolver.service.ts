import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private recipeService: RecipeService
  ) {}

  // This method is automatically called when the route is resolved
  // It retrieves recipes either from the local service or from the server
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
     // Get the recipes from the local service
    const recipes = this.recipeService.getRecipes();

// Check if there are no recipes in the local service
    if (recipes.length === 0) {
        // Fetch recipes from the server using the DataStorageService
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }
}
