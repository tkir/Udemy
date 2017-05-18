import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import {Page404Component} from "../404.component";
import {ShoppingListComponent} from "./shopping-list.component";

const SHOPPING_LIST_ROUTS: Routes = [{
    path: 'shopping-list',
    component: ShoppingListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(SHOPPING_LIST_ROUTS)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule {
}
