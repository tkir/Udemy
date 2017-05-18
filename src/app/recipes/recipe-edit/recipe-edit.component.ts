import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../recipe";
import {RecipeService} from "../recipe.service";
import {FormGroup, FormBuilder, Validators, FormArray} from "@angular/forms";
import {Ingredient} from "../../shared/ingredient";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styles: []
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  private recipeIndex: number;
  recipe: Recipe = new Recipe('', '', '', '', []);
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    let subs = this.route.params
      .subscribe((params: any) => {
        if (params.hasOwnProperty('id')) {
          this.recipeIndex = +params['id'];
          this.subscriptions.push(this.recipeService.getRecipe(this.recipeIndex)
            .subscribe(recipe => this.recipe = recipe));
        }
      });

    this.subscriptions.push(subs);
    this.buildForm();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subs => subs.unsubscribe());
    this.subscriptions = [];
  }

  buildForm() {
    let ingredients = this.fb.array(
      this.recipe.ingredients
        .map(ing => this.fb.group({
          name: [ing.name, Validators.required],
          amount: [ing.amount, [Validators.required, Validators.pattern(/^-?\d*\.?\d*$/)]]
        }))
    );

    this.form = this.fb.group({
      name: [this.recipe.name, Validators.required],
      imagePath: [this.recipe.imagePath],
      description: [this.recipe.description],
      ingredients: ingredients
    });
  }

  onSubmit() {
    if (this.recipeIndex === undefined)
      this.recipeService.addRecipe(this.form.value);
    else
      this.recipeService.editRecipe(this.recipeIndex, this.form.value);

    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  navigateBack() {
    this.router.navigate(['../']);
  }

  onRemoveItem(i: number) {
    (<FormArray>this.form.get('ingredients')).removeAt(i);
  }

  onAddItem(item: Ingredient) {
    (<FormArray>this.form.get('ingredients'))
      .push(this.fb.group({
        name: [item.name, Validators.required],
        amount: [item.amount, [Validators.required, Validators.pattern(/^-?\d*\.?\d*$/)]]
      }));
  }
}
