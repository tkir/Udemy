import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common'
import {FormsModule} from "@angular/forms";

import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingListService} from "./shopping-list.service";
import {ShoppingListRoutingModule} from "./shopping-list-routing.module";
import {ShoppingListAddComponent} from "./shopping-list-add.component";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingListAddComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ShoppingListRoutingModule
  ],
  providers: [
    ShoppingListService
  ]
})
export class ShoppingListModule {
}

