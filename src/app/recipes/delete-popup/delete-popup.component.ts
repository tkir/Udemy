import {Component, OnInit, OnDestroy} from '@angular/core';

import {Router} from "@angular/router";
import {Location} from "@angular/common";
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styles: [`.delete-popup{position:fixed; top:10%; left: 10%;z-index: 1000;}`]
})
export class DeletePopupComponent implements OnInit, OnDestroy {
  recipe: Recipe = null;
  private subscription: Subscription;

  constructor(private recipeService: RecipeService,
              private router: Router,
              private location: Location) {
  }

  ngOnInit() {
    this.subscription = this.recipeService.PopupGetRecipe()
      .subscribe(recipe => this.recipe = recipe);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDeleteClick() {
    this.recipeService.PopupSetResult(true);
    this.router.navigate(['../']);
  }

  onCancelClick() {
    this.recipeService.PopupSetResult(false);
    this.router.navigate([this.location.path(), {outlets: {popup: null}}]);
  }
}
