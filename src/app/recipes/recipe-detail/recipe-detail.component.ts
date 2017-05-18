import {Component, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import 'rxjs/add/operator/pairwise';

import {Recipe} from "../recipe";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent implements OnInit, OnDestroy {


  selectedRecipe: Recipe;
  private recipeIndex: number;
  private subscriptions: Subscription[] = [];

  constructor(private shoppingListService: ShoppingListService,
              private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    let subs = this.route.params
      .subscribe((params: any) => {
        this.recipeIndex = +params['id'];
        this.subscriptions.push(this.recipeService.getRecipe(this.recipeIndex)
          .subscribe(recipe => this.selectedRecipe = recipe));
      });

    this.subscriptions.push(subs);

  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
    this.subscriptions = [];
  }

  onAddToShoppingList() {
    this.shoppingListService.addItems(this.selectedRecipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete() {
    let popupSubscription = this.recipeService.PopupSetRecipe(this.selectedRecipe)
      .subscribe(() =>
        this.router.navigate(['/recipes', this.recipeIndex, {outlets: {popup: ['delete']}}], {skipLocationChange: true})
      );

    this.subscriptions.push(popupSubscription);
  }
}
