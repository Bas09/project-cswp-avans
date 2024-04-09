import { Component, OnInit } from '@angular/core';
import { PartyService } from '../party.service';
import { IParty } from '@avans-project-cswp/shared/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-project-cswp-party-edit',
  templateUrl: './party-edit.component.html',
  styleUrls: [],
})
export class PartyEditComponent implements OnInit {
  party: IParty = {} as IParty;
  isEditing = false; // Add a flag to track if editing or creating

  name = '';

  nationality = '';
  biography = '';

  birthDate = '';
  deathDate? = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private partyService: PartyService
  ) {}

  ngOnInit(): void {
    const partyId = this.route.snapshot.paramMap.get('id');

    if (partyId && partyId != 'new') {
      this.isEditing = true;
      console.log('partyId found', this.isEditing);
      this.partyService.read(partyId).subscribe((party: IParty) => {
        this.party = party;
        // this.name = party.name;
        // this.gender = party.gender;
        // this.nationality = party.nationality;
        // this.biography = party.biography;
        // this.genre = party.genre;
        // this.birthDate = party.birthDate;
        // this.deathDate = party.deathDate;
      });
    }
  }

  saveParty() {
    console.log('Save party clicked');
    if (this.isEditing) {
      console.log('updateParty called');
      this.updateParty();
    } else {
      console.log('createParty called');
      this.createParty();
    }
  }

  updateParty() {
    console.log('Updating party clicked in party-edit.component.ts');
    console.log('Before Update', this.party);

    const updatedParty: IParty = {
      _id: this.party._id,
      partyName: '',
      creationDate: '',
      partyDate: '',
      location: '',
      maxAttendees: 0,
      partyDescription: '',
      // partyCreatorId: localStorage.getItem('user'),
    };

    console.log('After Update', updatedParty);

    this.partyService.updateParty(updatedParty).subscribe(() => {
      console.log('After Successful Update', this.party);
      this.router.navigate(['/party']);
    });
  }

  createParty() {
    console.log('Creating party clicked in party-edit.component.ts', 'TAG');
    const newParty: IParty = {
      _id: '',
      partyName: '',
      creationDate: '',
      partyDate: '',
      location: '',
      maxAttendees: 0,
      partyDescription: '',
      partyCreatorId: undefined,
    };
    console.log('New party', newParty);

    this.partyService.createParty(newParty).subscribe(
      (response) => {
        console.log('Party created successfully', response);
        this.router.navigate(['/party']);
      },
      (error) => {
        console.error('Error creating party:', error);
      }
    );
  }
}
