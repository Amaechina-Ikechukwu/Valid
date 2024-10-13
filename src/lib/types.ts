export interface ContributionGroup {
  id: string;
  groupName: string;
  participants: number;
  percentageToGoal: number;
  image?: string;
}
export interface GroupDetails {
  description: string;
  groupName: string;
  participantsEmails: string[];
  totalContributed: number;
  amountLeft: number;
  admin: {
    name: string;
    email: string;
  };
  adminWithdrawal: boolean;
  image?: string;
}

export interface Transaction {
  email: string;
  amount: number;
  date: Date;
}

export interface ContributionGroups {
  [groupName: string]: GroupDetails;
}

export interface GroupTransactions {
  [groupName: string]: Transaction[];
}
