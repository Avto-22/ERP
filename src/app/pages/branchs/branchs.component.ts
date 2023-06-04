import { Component, OnInit } from '@angular/core';
import { Observable, forkJoin, tap } from 'rxjs';
import {
  Branch,
  BranchWithUsers,
  ChangedUser,
  User,
} from 'src/app/models/branchs.model';
import { BranchService } from 'src/app/services/http-services/branch.service';
import { BranchsUtil } from 'src/app/utilities';

@Component({
  selector: 'app-branchs',
  templateUrl: './branchs.component.html',
  styleUrls: ['./branchs.component.css'],
})
export class BranchsComponent implements OnInit {
  branchsWithUsers$!: Observable<[Branch[], User[]]>;

  branchs!: BranchWithUsers[];

  chusedUser!: User;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.initBranchs();
    this.listenUserChanges();
  }

  initBranchs(): void {
    this.branchsWithUsers$ = forkJoin([
      this.branchService.getAllBranchs(),
      this.branchService.getAllUser(),
    ]).pipe(
      tap((res) => {
        this.filterBranchs(res[0], res[1]);
      })
    );
  }

  filterBranchs(branchs: Branch[], users: User[]) {
    this.branchs = branchs
      .map((branch) => {
        return {
          ...branch,
          users: users.filter((user) => user.filialNr === branch.filialNr),
        };
      })
      .filter((branch) => branch.users.length);
  }

  chooseUser(user: User) {
    this.chusedUser = user;

    this.branchs = this.branchs.map((branch, index) => {
      if (index === user.branchIndex) {
        return BranchsUtil.setChoosedBranchUserSelectStatus(branch, user);
      } else {
        return BranchsUtil.unselectBranchUsers(branch);
      }
    });
  }

  listenUserChanges() {
    this.branchService.ChangedUserInfo$.subscribe((res) => {
      if (res) {
        this.checkUserBranch(res);
      }
    });
  }

  checkUserBranch(changedUser: ChangedUser): void {
    let isUserBranchChanged: boolean =
      changedUser.filialNr !== changedUser.currentFilialNr;
    if (isUserBranchChanged) {
      BranchsUtil.deleteUserFromBranch(changedUser, this.branchs);
      BranchsUtil.moveUserToBranch(changedUser, this.branchs);
      return;
    }
    BranchsUtil.changeUserInfo(changedUser, this.branchs);
  }

  trackByFn(index: number) {
    return index;
  }
}
