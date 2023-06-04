export interface Branch {
  filialNr: number;
  ansichtName: string;
  bundesLand: string;
  land: string;
}

export interface User {
  id: number;
  ansichtNam: string;
  name: string;
  vorname: string;
  status: string;
  notActive: number;
  qualifikation: string;
  filialNr: number;
  filiale: Branch;
  land: string;
  bundesLand: string;
  istAdmin: true;
  istPlan: true;
  geburtsDatum: string;
  eintritsDatum: string;
  barcode: string;
  barcode1: string;
  passwort: string;
  adkran: number;
  kaplan: number;
  userIndex: number;
  branchIndex: number;
  isSelected: boolean;
}

export type BranchWithUsers = Branch & { users: User[] };

export type ChangedUser = User & {
  currentFilialNr: number;
};
