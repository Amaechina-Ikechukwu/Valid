export interface ContributionGroup {
  id: string;
  name: string;
  participants: number;
  percentageToGoal: number;
  image?: string;
}
export interface GroupDetails {
  purpose: string;
  name: string;
  participants: string[];
  amount: number;
  remaining: number;
  admin: string;
  adminWithdrawal: { initiated: boolean; initiatedAt: string };
  image?: string;
  id: string;
}

export interface Transaction {
  email: string;
  amount: number;
  date: string;
}

export interface ContributionGroups {
  [name: string]: GroupDetails;
}

export interface GroupTransactions {
  [name: string]: Transaction[];
}
