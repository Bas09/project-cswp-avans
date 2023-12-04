import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, catchError, of, switchMap, tap } from 'rxjs';
import { IEntity } from '@avans-project-cswp/frontend/common';
import { EntityService } from '../services/entity.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-edit-component',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: [],
})
export class EditComponent<T extends IEntity> implements OnInit, OnDestroy {
  entity: T = {} as T;
  subs: Subscription = new Subscription();
  httpOptions: any;

  constructor(
    private entityService: EntityService<T>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  // edit entity or edit existing entity when id exists
  ngOnInit(): void {
    this.subs.add(
      this.route.paramMap
        .pipe(
          tap(console.log),
          switchMap((params: ParamMap) => {
            if (!params.get('id')) {
              console.log('No ID has been found!');
              return of({} as T);
            } else {
              return this.entityService.read(params.get('id'));
            }
          }),
          tap(console.log)
        )
        .subscribe((entity: T) => {
          this.entity = entity;
        })
    );
  }

  // check wheter to update or add an entity
  onSubmit(entity: T): void {
    console.log('onSubmit', entity);

    if (this.entityNeedsUpdate()) {
      this.updateEntity(entity);
    } else {
      this.addEntity(entity);
    }
  }

  private entityNeedsUpdate(): boolean {
    if (this.entity._id == null && this.entity._id == undefined) {
      return true;
    } else {
      return false;
    }
  }

  // update entity
  private updateEntity(entity: T): void {
    this.subs.add(
      this.entityService
        .update(entity, this.httpOptions)
        .pipe(
          catchError(() => {
            console.log('error');
            return of(false);
          })
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        })
    );
  }

  // add entity
  private addEntity(entity: T): void {
    this.subs.add(
      this.entityService
        .create(entity, this.httpOptions)
        .pipe(
          catchError(() => {
            console.log('error');
            return of(false);
          })
        )
        .subscribe((success) => {
          console.log(success);
          if (success) {
            this.router.navigate(['..'], { relativeTo: this.route });
          }
        })
    );
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }
}
