import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const products = [
    {id: 1, name: 'Milk', price: 4},
    {id: 2, name: 'Brad', price: 5},
    {id: 3, name: 'Steak', price: 22},
    {id: 4, name: 'Lemon', price: 3},
    {id: 5, name: 'Cheese', price: 6},
    {id: 6, name: 'Chicken', price: 9},
    {id: 7, name: 'Beef', price: 11},
    {id: 8, name: 'Pasta', price: 10},
    {id: 9, name: 'Sugar', price: 2},
    {id: 10, name: 'Pizza', price: 14}
    ];
    return {products};
  }

 
  genId(products: Product[]): number {
    return products.length > 0 ? Math.max(...products.map(product => product.id)) + 1 : 11;
  }
}