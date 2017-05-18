import {Injectable, EventEmitter} from '@angular/core';
import {Recipe} from "./recipe";
import {Observable} from "rxjs";
import {ApiService} from "../api.service";

@Injectable()
export class RecipeService {
  private path: string = 'recipes.json';
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Шницель',
  //     'С немецкого языка слово «шницель» переводится как «вырезка».',
  //     'С немецкого языка слово «шницель» переводится как «вырезка» и отражает предпочтительный для приготовления блюда вид мяса. Использовать лучше нежное мясо без жировых прослоек и жил, точнее – именно вырезку.',
  //     'http://ic.pics.livejournal.com/kinda_cook/51938427/523605/523605_original.jpg',
  //     [
  //       {name: 'лимон', amount: 3},
  //       {name: 'сахар', amount: 250},
  //       {name: 'сливочное масло', amount: 125},
  //       {name: 'растительное масло', amount: 40},
  //       {name: 'желток', amount: 1},
  //       {name: 'яйцо', amount: 2},
  //       {name: 'мука', amount: 165},
  //       {name: 'разрыхлитель', amount: 0.5}
  //     ]),
  //   new Recipe(
  //     'Штрудель',
  //     'Oчень вкусная и просто замечательная во всех отношениях выпечка.',
  //     'Научиться готовить штрудель стоит – это действительно очень вкусная и просто замечательная во всех отношениях выпечка, ведь делается он быстро, а результат получается просто великолепным, какой бы штрудель вы ни готовили.',
  //     'https://s1.tchkcdn.com/g-UuSLQAYvnKonFHws7cizQQ/13/217876/660x480/f/0/0e66f4cfd7f357109ad504b3ee5ffcd1_shutterstock_104827940.jpg',
  //     [
  //       {name: 'лимон', amount: 3},
  //       {name: 'сахар', amount: 250},
  //       {name: 'сливочное масло', amount: 125},
  //       {name: 'растительное масло', amount: 40},
  //       {name: 'желток', amount: 1},
  //       {name: 'яйцо', amount: 2},
  //       {name: 'мука', amount: 165},
  //       {name: 'разрыхлитель', amount: 0.5}
  //     ]),
  //   new Recipe(
  //     'Кекс',
  //     'Hежный и мягкий кекс с отличным лимонным вкусом и ароматом.',
  //     'Очень-очень нежный и мягкий кекс с отличным лимонным вкусом и ароматом. Он в прямом смысле слова тает во рту, при этом не разваливается, не плывет и вообще отлично переносит транспортировку и хранение. Ниже я расскажу, как нашёл оптимальный рецепт глазури и как сделать кекс более или менее лимонным.',
  //     'http://www.ukr-prom.com/img/alboms/31362010-08-2838049532.jpg',
  //     [
  //       {name: 'лимон', amount: 3},
  //       {name: 'сахар', amount: 250},
  //       {name: 'сливочное масло', amount: 125},
  //       {name: 'растительное масло', amount: 40},
  //       {name: 'желток', amount: 1},
  //       {name: 'яйцо', amount: 2},
  //       {name: 'мука', amount: 165},
  //       {name: 'разрыхлитель', amount: 0.5}
  //     ])
  // ];

  constructor(private api: ApiService) {
  }

  getRecipes(): Observable<Recipe[]> {
    return Observable.of(this.recipes);
  }

  getRecipe(id: number): Observable<Recipe> {
    return Observable.of(this.recipes[id]);
  }

  deleteRecipe(recipe: Recipe): void {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(id: number, recipe: Recipe) {
    recipe.shortDesc = recipe.description.substring(0, 50);
    this.recipes[id] = recipe;
  }

  storeData(): Observable<any> {
    return this.api.put(this.path, this.recipes);
  }

  fetchData(): Observable<any> {
    return this.api.get(this.path)
      .map(res => this.recipes = res);
  }


  private popupRecipe: Recipe = null;

  PopupSetRecipe(recipe: Recipe): Observable<boolean> {
    this.popupRecipe = recipe;
    return Observable.of(true);
  }

  PopupGetRecipe(): Observable<Recipe> {
    return Observable.of(this.popupRecipe);
  }

  PopupSetResult(res: boolean): void {
    if (res) this.deleteRecipe(this.popupRecipe);
  }
}
