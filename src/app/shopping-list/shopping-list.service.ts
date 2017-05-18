import {Injectable} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {forEach} from "@angular/router/src/utils/collection";
import {Observable} from "rxjs";

@Injectable()
export class ShoppingListService {
  private items: Ingredient[] = [];

  constructor() {
  }

  getItems(): Observable<Ingredient[]> {
    return Observable.of(this.items);
  }

  addItems(items: Ingredient[]): void {
    for (let i = 0; i < items.length; ++i) {
      this.addItem(items[i]);
    }
  }

  addItem(item: Ingredient): void {
    let j = this.items.findIndex(it => item.name === it.name);
    if (~j) this.items[j].amount += +item.amount;
    else this.items.push(item);
  }

  editItem(old: Ingredient, newItem: Ingredient) {
    this.items[this.items.indexOf(old)] = newItem;
  }

  deleteItem(item: Ingredient): void {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
