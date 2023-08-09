import { Component,OnInit } from '@angular/core';
import { Incredient } from '../shared/ingredient.model';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients: Incredient[] = [
  new Incredient('Apples',5),
  new Incredient('Tomatos',10)
]



  constructor(){

  }
ngOnInit(): void {
  
}
}
