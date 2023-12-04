import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntity } from '@avans-project-cswp/frontend/common';
import { EntityService } from '../services/entity.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'avans-project-cswp-list-component',
  standalone: true,
  imports: [CommonModule],
  template: '',
  styles: [],
})
export class ListComponent<T extends IEntity> implements OnInit {
  entities$!: Observable<T[] | null>;

  constructor(private entityService: EntityService<T>) {}

  ngOnInit(): void {
    this.entities$ = this.entityService.list();
    console.log('list entities:', this.entities$);
  }
}
