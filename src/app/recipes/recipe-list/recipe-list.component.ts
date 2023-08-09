import { Component,OnInit,EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() recipeWasSelected = new EventEmitter<Recipe>()
recipes:Recipe[] = [
  new Recipe('Test Recipe','tasted recipe discription','https://g.foolcdn.com/editorial/images/191563/organic-produce-and-foods.jpg'),
  new Recipe('Another Recipe','tasted recipe discription','https://g.foolcdn.com/editorial/images/191563/organic-produce-and-foods.jpg'),

]



constructor(){}

ngOnInit(): void {}

onRecipeSelected(recipe:Recipe){
this.recipeWasSelected.emit(recipe)
}
}
