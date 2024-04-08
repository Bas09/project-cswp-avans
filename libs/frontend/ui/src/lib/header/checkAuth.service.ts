// import {
//   EventEmitter,
//   Inject,
//   Injectable,
//   Output,
//   forwardRef,
// } from '@angular/core';
// import { AuthService } from '@avans-project-cswp/backend/auth';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable()
// export class CheckAuthService {
//   constructor(
//     @Inject(forwardRef(() => AuthService))
//     private readonly authService: AuthService
//   ) {}

//   @Output() logginStatusChange = new EventEmitter<boolean>();

//   isLoggedIn(): Observable<boolean> {
//     return this.authService.currentUser$.pipe(
//       map((user) => user !== undefined)
//     );
//     this.logginStatusChange.emit(true);
//   }
// }
