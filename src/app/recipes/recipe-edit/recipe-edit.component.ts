import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  recipeForm!: FormGroup;

  get recipeControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    //? Subscribe to route parameters to determine if editing an existing recipe or creating a new one.
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id']; //? Extract the ID from the parameters.
      this.editMode = params['id'] != null; //? Check if in edit mode.
      this.initForm(); //? Initialize the form for editing or creating.
    });
  }

  //? Handle form submission.
  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);

    if (this.editMode) {
      //? Update existing recipe.
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      //? Add new recipe.
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel(); //? Navigate back after submission.
  }

  //? Add a new ingredient form group to the form array.
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  //? Remove an ingredient form group from the form array.
  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  //? Navigate back to the recipe detail page.
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  //? Initialize the recipe form for editing or creating.
  private initForm() {
    let recipeName: string = '';
    let recipeImagePath: string = '';
    let recipeDescription: string = '';
    let recipeIngredients: any = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id); //? Fetch the recipe being edited.
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      //? Populate ingredients in form array if available in the original recipe.
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    //? Create the recipe form with the retrieved or default values.
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }
}
