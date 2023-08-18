import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  //? Stores recipes to the Firebase database
  storeRecipes() {
    //? Get the recipes from the RecipeService
    const recipes = this.recipeService.getRecipes();

    //? Send a PUT request to Firebase with the recipes data
   this.http
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
    return this.http
      .get<Recipe[]>(
        'https://angularlearning-c4963-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }


}
