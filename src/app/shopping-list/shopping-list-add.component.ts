import {Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {Ingredient} from "../shared/ingredient";
import {ShoppingListService} from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: 'shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {

  @Input() item: Ingredient;
  @Output() cleared=new EventEmitter();
  isAdd: boolean = true;

  constructor(private sls: ShoppingListService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isAdd = changes.item.currentValue === null ? true : false;
  }

  onSubmit(ingredient: Ingredient) {
    let newIngredient = new Ingredient(ingredient.name, +ingredient.amount);
    if (!this.isAdd) {
      this.sls.editItem(this.item, newIngredient);
      this.onClear();
    } else {
      this.item = newIngredient;
      this.sls.addItem(this.item);
    }
  }

  onDelete(): void {
    this.sls.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true;
    this.cleared.emit(null);
  }
}
