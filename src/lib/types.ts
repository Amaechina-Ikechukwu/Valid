export interface ContributionGroup {
  id: string;
  name: string;
  participants: [];
  remaining: number;
  image?: string;
  purpose: string;
}
export interface GroupDetails {
  purpose: string;
  name: string;
  participants: string[];
  amount: number;
  contributedAmount: number;
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
