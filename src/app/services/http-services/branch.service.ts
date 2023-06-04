import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Branch, ChangedUser, User } from 'src/app/models/branchs.model';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  private changedUser$: BehaviorSubject<ChangedUser | undefined> =
    new BehaviorSubject<ChangedUser | undefined>(undefined);

  get ChangedUserInfo$(): Observable<ChangedUser | undefined> {
    return this.changedUser$.asObservable();
  }

  set changedUserInfo(user: ChangedUser | undefined) {
    this.changedUser$.next(user);
  }

  constructor(private api: ApiService) {}

  getAllBranchs(): Observable<Branch[]> {
    return this.api.get<Branch[]>('/getks');
  }

  getAllUser(): Observable<User[]> {
    return this.api.get<User[]>('/getmt');
  }
}
