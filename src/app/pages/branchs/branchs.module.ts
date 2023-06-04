import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BranchsRoutingModule } from './branchs-routing.module';
import { BranchComponent } from './components/branch/branch.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { BranchsComponent } from './branchs.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BranchComponent,
    UserDetailsComponent,
    BranchsComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    BranchsRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class BranchsModule { }
