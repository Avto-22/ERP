import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
  BranchWithUsers,
  ChangedUser,
  User,
} from 'src/app/models/branchs.model';
import { BranchService } from 'src/app/services/http-services/branch.service';
import { BranchsUtil } from 'src/app/utilities';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  @Input() branchs!: BranchWithUsers[];

  @Input() set user(value: User) {
    this.choosedUser = value;
    if (this.userDetailsForm) {
      this.setDetailsForm();
    }
  }

  get user(): User {
    return this.choosedUser;
  }

  choosedUser!: User;

  userDetailsForm!: FormGroup;

  isUserInfoChanged: boolean = false;

  editForm: boolean = false;

  isBranchNummerIncorrect: boolean = false;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.createUserDetailsForm();
  }

  save() {
    this.setInfoChangeStatus();
    if (this.isUserInfoChanged) {
      if (!this.isCorrectBranchNummer()) {
        this.isBranchNummerIncorrect = true;
        return;
      }
      this.isBranchNummerIncorrect = false;
      let newUser: ChangedUser = this.createNewUser();

      this.branchService.changedUserInfo = {
        ...newUser,
        filialNr: this.user.filialNr,
        currentFilialNr: newUser.filialNr,
      };
      
      this.user = {
        ...newUser,
        filialNr: newUser.filialNr,
        branchIndex: BranchsUtil.getBranchIndex(newUser.filialNr, this.branchs),
        userIndex: this.user.filialNr !== newUser.filialNr ? 0 : newUser.userIndex
      };
    }
    this.editForm = false;
  }

  createUserDetailsForm() {
    this.userDetailsForm = new FormGroup({
      ansichtNam: new FormControl(this.user.ansichtNam),
      bundesLand: new FormControl(this.user.bundesLand),
      filialNr: new FormControl(this.user.filialNr),
    });
  }

  createNewUser(): ChangedUser {
    return {
      ...this.user,
      ...this.userDetailsForm.value,
      filialNr: +this.userDetailsForm.value.filialNr,
    };
  }

  setInfoChangeStatus() {
    this.isUserInfoChanged = BranchsUtil.isUserInfoChanged(
      this.user,
      this.userDetailsForm.value,
      'ansichtNam',
      'bundesLand',
      'filialNr'
    );
  }

  setDetailsForm() {
    this.userDetailsForm.setValue({
      ansichtNam: this.choosedUser?.ansichtNam,
      bundesLand: this.choosedUser?.bundesLand,
      filialNr: this.choosedUser?.filialNr,
    });
  }

  isCorrectBranchNummer(): boolean {
    return BranchsUtil.isCorrectBranchNummer(
      +this.userDetailsForm.controls['filialNr'].value,
      this.branchs
    );
  }

  closeEdit(){
    this.editForm = false;
    this.isBranchNummerIncorrect = false;
    this.setDetailsForm();
  }
}
