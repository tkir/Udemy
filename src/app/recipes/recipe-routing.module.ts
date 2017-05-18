import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recipe-start.component";
import {Page404Component} from "../404.component";
import {DeletePopupComponent} from "./delete-popup/delete-popup.component";

const RECIPE_ROUTS: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailComponent, children:[
        {path: 'delete', component: DeletePopupComponent, outlet:'popup'}
      ]},
      {path: ':id/edit', component: RecipeEditComponent},
      {path: '', component: RecipeStartComponent, pathMatch: 'full'},
      {path: '**', component: Page404Component}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(RECIPE_ROUTS)],
  exports: [RouterModule]
})
export class RecipeRoutingModule {
}
