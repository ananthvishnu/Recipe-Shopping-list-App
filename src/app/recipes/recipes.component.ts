import { Component, OnInit } from '@angular/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService],//? Provides the RecipeService to this component and its child components
})
export class RecipesComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}
    
}
