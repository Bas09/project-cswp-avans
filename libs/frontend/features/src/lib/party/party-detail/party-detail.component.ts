import { Component, OnDestroy, OnInit } from '@angular/core';
import { PartyService } from '../party.service';
import { IParty } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'avans-project-cswp-party-detail',
  templateUrl: './party-detail.component.html',
  styles: [],
})
export class PartyDetailComponent implements OnInit, OnDestroy {
  party: IParty | null = null;
  subscription: Subscription | undefined = undefined;
  canEdit: boolean = false;

  partyId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private partyService: PartyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.partyId = params.get('id');

      this.partyService.read(this.partyId).subscribe(
        (result) => {
          this.party = result;
          this.canEdit = true;
        },
        (error) => {
          console.error('Error fetching party:', error);
        }
      );
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  onDelete() {
    console.log('onDelete button clicked');
    if (this.party) {
      console.log('this.party exists: ', this.party);
      this.partyService.removeParty(this.party._id).subscribe(() => {
        console.log('party deleted', this.party?._id);

        this.partyService.list().subscribe((partys) => {
          console.log('Updated party list:', partys);
        });
      });
    }

    this.router.navigate(['/partys']);
  }
}
