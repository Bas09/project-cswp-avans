import { IEntity } from '@avans-project-cswp/frontend/common';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Id } from '@avans-project-cswp/shared/api';

// import { AlertService } from '@avans-nx-workshop/share-a-meal/ui';
// import { AlertType } from '@avans-nx-workshop/share-a-meal/ui';

/**
 * See https://angular.io/guide/http#requesting-data-from-a-server
 */
const httpOptions = {
  observe: 'body',
  responseType: 'json' as const,
};

/**
 * Generic service class for communicating objects to/from services.
 * Serves generic CRUD operations.
 */
export class EntityService<T extends IEntity> {
  constructor(
    private client: HttpClient,
    private url: string,
    private endpoint: string
  ) {}

  /**
   * Get all items.
   *
   * @options options
   */
  public list(options?: any): Observable<T[] | null> {
    const endpoint = `${this.url}${this.endpoint}`;
    console.log(`list ${endpoint}`);
    return this.client.get<T[]>(endpoint, { ...options, ...httpOptions }).pipe(
      map((response: any) => response.results),
      catchError(this.handleError)
    );
  }

  /**
   * Create the item at the service.
   *
   * @param item Item to be created.
   */
  public create(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}`;
    console.log(`create ${endpoint}`);
    return this.client
      .post<T>(endpoint, item, { ...options, ...httpOptions })
      .pipe(
        map((response: any) => response.results),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single item from the service.
   *
   * @param id ID of the item to get.
   */
  public read(id: Id | null, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${id}`;
    console.log(`read ${endpoint}`);
    return this.client.get<T[]>(endpoint, { ...options, ...httpOptions }).pipe(
      map((response: any) => response.results),
      catchError(this.handleError)
    );
  }

  /**
   * Update (put) new info.
   *
   * @param item The new item.
   */
  public update(item: T, options?: any): Observable<T> {
    const endpoint = `${this.url}${this.endpoint}/${item._id}`;
    console.log(`update ${endpoint}`);
    return this.client.put(endpoint, item, { ...options, ...httpOptions }).pipe(
      map((response: any) => response.results),
      catchError(this.handleError)
    );
  }

  /**
   * Delete an item at the service.
   *
   * @param id ID of item to be deleted.
   */
  public delete(id: Id, options?: any): Observable<object> {
    const endpoint = `${this.url}${this.endpoint}/${id}`;
    console.log(`delete ${endpoint}`);

    return this.client
      .delete(endpoint, { ...options, ...httpOptions })
      .pipe(catchError(this.handleError));
  }

  /**
   * Handle errors.
   */
  public handleError(error: HttpErrorResponse): Observable<never> {
    console.log('handleError in EntityService', error);

    return throwError(() => new Error(error.message));
  }
}