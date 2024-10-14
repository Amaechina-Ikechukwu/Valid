export interface ContributionGroup {
  id: string;
  name: string;
  participants: number;
  percentageToGoal: number;
  image?: string;
}
export interface GroupDetails {
  description: string;
  name: string;
  participantsEmails: string[];
  total: number;
  remaining: number;
  admin: string;
  adminWithdrawal: boolean;
  image?: string;
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
