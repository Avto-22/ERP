import { BranchWithUsers, ChangedUser, User } from '../models/branchs.model';

export function setChoosedBranchUserSelectStatus(
  branch: BranchWithUsers,
  user: User
): BranchWithUsers {
  return {
    ...branch,
    users: branch.users.map((res, index) => {
      if (index === user.userIndex) {
        return {
          ...res,
          isSelected: user.isSelected,
        };
      }
      return {
        ...res,
        isSelected: false,
      };
    }),
  };
}

export function unselectBranchUsers(branch: BranchWithUsers): BranchWithUsers {
  return {
    ...branch,
    users: branch.users.map((res) => ({ ...res, isSelected: false })),
  };
}

export function moveUserToBranch(
  changedUser: ChangedUser,
  branchs: BranchWithUsers[]
) {
  changedUser.filialNr = changedUser.currentFilialNr;
  changedUser.isSelected = true;
  branchs.forEach((branch, index) => {
    if (branch.filialNr === changedUser.currentFilialNr) {
      changedUser.branchIndex = index;
      changedUser.userIndex = 0;
      branch.users = [changedUser, ...branch.users];
    }
  });
}

export function deleteUserFromBranch(
  deletedUser: ChangedUser,
  branchs: BranchWithUsers[]
) {
  branchs[deletedUser.branchIndex].users.splice(deletedUser.userIndex, 1);
}

export function changeUserInfo(
  changedUser: ChangedUser,
  branchs: BranchWithUsers[]
) {
  branchs.forEach((branch, index) => {
    if (branch.filialNr === changedUser.filialNr) {
      changedUser.branchIndex = index;
      changedUser.isSelected = true;
      branchs[index].users[changedUser.userIndex] = changedUser;
    }
  });
}

export function isUserInfoChanged(
  previousUser: User,
  currentUser: User,
  ...comparableValues: Array<keyof User>
): boolean {
  let result: boolean = false;
  comparableValues.forEach((value) => {
    if (previousUser[value] !== currentUser[value]) {
      result = true;
      return;
    }
  });

  return result;
}

export function getBranchIndex(
  filialNr: number,
  branchs: BranchWithUsers[]
): number {
  let result: number = -1;
  branchs.forEach((branch, index) => {
    if (branch.filialNr === filialNr) {
      result = index;
      return;
    }
  });
  return result;
}

export function isCorrectBranchNummer(
  branchNummer: number,
  branchs: BranchWithUsers[]
): boolean {
  let result: boolean = false;
  branchs.forEach((branch) => {
    if (branch.filialNr === branchNummer) {
      result = true;
      return;
    }
  });
  return result;
}
