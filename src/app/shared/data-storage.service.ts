import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}
  //? Stores recipes to the Firebase database
  storeRecipes() {
    //? Get the recipes from the RecipeService
    const recipes = this.recipeService.getRecipes();

    //? Send a PUT request to Firebase with the recipes data
    return this.http
      .put(
        'https://angularlearning-c4963-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response); //? Log the response from Firebase
      });
  }

  //? Fetches recipes from the Firebase database
  fetchRecipes() {
    //? Fetches recipes from the Firebase database
    return this.http
      .get<Recipe[]>(
        'https://angularlearning-c4963-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          //? Map the retrieved recipes and ensure ingredients array exists
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          //? Update the local RecipeService with the fetched recipes
          this.recipeService.setRecipes(recipes);
        })
      );
  }
}
