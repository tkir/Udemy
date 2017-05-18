import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './dropdown.directive';
import {AppRoutingModule} from "./app-routing.module";
import {RecipesModule} from "./recipes/recipes.module";
import { Page404Component } from './404.component';
import {ShoppingListModule} from "./shopping-list/shopping-list.module";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    Page404Component
  ],
  imports: [
    BrowserModule,
    ShoppingListModule,
    RecipesModule,

    AppRoutingModule
  ],
  providers: [
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
