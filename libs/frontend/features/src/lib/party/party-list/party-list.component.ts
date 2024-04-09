import { Component, OnDestroy, OnInit } from '@angular/core';
import { PartyService } from '../party.service';
import { IParty } from '@avans-project-cswp/shared/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-party-list',
  templateUrl: './party-list.component.html',
  styleUrls: [],
})
export class PartyListComponent implements OnInit, OnDestroy {
  party: IParty[] | null = null;
  subscription: Subscription | undefined = undefined;

  constructor(private partyService: PartyService) {}

  ngOnInit(): void {
    this.subscription = this.partyService.list().subscribe((results) => {
      console.log(`results: ${results}`);
      this.party = results;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
