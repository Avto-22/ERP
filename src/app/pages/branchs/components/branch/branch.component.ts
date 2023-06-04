import { Component, EventEmitter, Input,  Output } from '@angular/core';
import { BranchWithUsers, User } from 'src/app/models/branchs.model';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css'],
})
export class BranchComponent {
  @Input() branch!: BranchWithUsers;
  @Input() branchIndex!: number;
  @Output() onUserChoose: EventEmitter<User> = new EventEmitter<User>();

  isBranchOpen: boolean = false;

  constructor() {}

  chooseUser(user: User, userIndex: number, branchIndex: number) {
    this.onUserChoose.emit({
      ...user,
      userIndex,
      branchIndex,
      isSelected: !user.isSelected,
    });
  }

  setBranchOpenStatus() {
    this.isBranchOpen = !this.isBranchOpen;
  }

  trackByFn(index: number) {
    return index;
  }
}
