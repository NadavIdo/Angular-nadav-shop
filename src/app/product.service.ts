import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { MessageService } from './message.service';
import { PRODUCTS } from './mock-products';
import { Product } from './product';

@Injectable({providedIn: 'root'})
export class ProductService {


  constructor(
    private messageService: MessageService,
    private http: HttpClient,
    ) { }

  private log(message: string) {
    this.messageService.add(`ProductService: ${message}`);
  }
  private productsUrl = 'api/products';

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getProduct(id:number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(url).pipe(
       tap(_ => this.log(`fetched products id=${id}`)),
        catchError(this.handleError<Product>(`getProduct id=${id}`))
      );
  }

  getProducts():Observable<Product[]> { // get products from server
    return this.http.get<Product[]>(this.productsUrl).pipe
    (
      catchError(this.handleError<Product[]>('getProducts', []))
    );
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.put(this.productsUrl, product, this.httpOpptions).pipe(
      tap(_=> this.log(`updated product id=${product.id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  httpOpptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.productsUrl, product, this.httpOpptions).pipe(
      tap((newProduct: Product) => this.log(`added product w/ id=${newProduct.id}`)),
      catchError(this.handleError<Product>('addProduct'))
    );
  }
  
  deleteProduct(id: number): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete<Product>(url, this.httpOpptions).pipe(
      tap(_=> this.log(`deleted product id =${id}`)),
      catchError(this.handleError<Product>('deleteProduct'))
    );
  }
// get products whose name contains search term
  searchProducts(term: string): Observable<Product[]> {
    if (!term.trim()) {
    // if not search term, return empty product array
      return of([]);
    }
    return this.http.get<Product[]>(`${this.productsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found products matching "${term}"`) :
        this.log(`no products matching "${term}"`)),
      catchError(this.handleError<Product[]>('searchProducts', []))
    );
  }

}
