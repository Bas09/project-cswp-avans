import { Component, OnInit } from '@angular/core';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { IEntity } from '@avans-project-cswp/frontend/common';
import { EntityService } from '../services/entity.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Id } from '@avans-project-cswp/shared/api';

@Component({
  selector: 'avans-project-cswp-detail-component',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: [],
})
export class DetailComponent<T extends IEntity> implements OnInit {
  entities$!: Observable<T>;

  constructor(
    private entityService: EntityService<T>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.entities$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.entityService.read(params.get('id')))
    );
    console.log('detail entitie:', this.entities$);
  }

  onDelete(id: Id): void {
    this.entityService
      .delete(id)
      .pipe(
        catchError(() => {
          return of(false);
        })
      )
      .subscribe(() => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
  }
}
