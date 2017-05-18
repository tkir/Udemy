import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import {ReactiveFormsModule} from "@angular/forms";

import {RecipesComponent} from './recipes.component';
import {RecipesListComponent} from './recipes-list/recipes-list.component';
import {RecipeItemComponent} from './recipes-list/recipe-item.component';
import {RecipeDetailComponent} from './recipe-detail/recipe-detail.component';
import {RecipeStartComponent} from './recipe-start.component';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';

import {RecipeService} from "./recipe.service";
import {RecipeRoutingModule} from "./recipe-routing.module";

import { DeletePopupComponent } from './delete-popup/delete-popup.component';
import {ApiService} from "../api.service";
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    RecipesComponent,
    RecipesListComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    DeletePopupComponent
  ],
  imports: [
    HttpModule,
    ReactiveFormsModule,
    CommonModule,
    RecipeRoutingModule
  ],
  providers: [
    ApiService,
    RecipeService
  ]
})
export class RecipesModule {
}

