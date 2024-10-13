import { ContributionGroups, GroupTransactions } from "./types";

const contributionGroups: ContributionGroups = {
  "Housing Fund": {
    description: "A group for saving towards housing expenses.",
    groupName: "Housing Fund",
    participantsEmails: [
      "john@example.com",
      "jane@example.com",
      "mark@example.com",
    ],
    totalContributed: 5000,
    amountLeft: 2000,
    admin: {
      name: "John Doe",
      email: "john@example.com",
    },
    adminWithdrawal: false,
    image:
      "https://th.bing.com/th/id/OIP.yD0rXTFB1XM0YI-adDXg2gAAAA?rs=1&pid=ImgDetMain",
  },
  "Education Fund": {
    description: "A group dedicated to education-related expenses.",
    groupName: "Education Fund",
    participantsEmails: ["mike@example.com", "sara@example.com"],
    totalContributed: 4000,
    amountLeft: 1000,
    admin: {
      name: "Mike Johnson",
      email: "mike@example.com",
    },
    adminWithdrawal: true,
    image: "",
  },
  "Vacation Fund": {
    description: "A group for saving towards a vacation trip.",
    groupName: "Vacation Fund",
    participantsEmails: ["alice@example.com", "bob@example.com"],
    totalContributed: 3000,
    amountLeft: 500,
    admin: {
      name: "Alice Smith",
      email: "alice@example.com",
    },
    adminWithdrawal: true,
    image: "",
  },
  "Emergency Fund": {
    description: "A group set up for emergency financial needs.",
    groupName: "Emergency Fund",
    participantsEmails: [
      "paul@example.com",
      "rachel@example.com",
      "tom@example.com",
    ],
    totalContributed: 7000,
    amountLeft: 3000,
    admin: {
      name: "Paul Walker",
      email: "paul@example.com",
    },
    adminWithdrawal: false,
    image: "",
  },
};
const groupTransactions: GroupTransactions = {
  "Housing Fund": [
    { email: "john@example.com", amount: 1000, date: new Date("2024-01-15") },
    { email: "jane@example.com", amount: 2000, date: new Date("2024-02-10") },
    { email: "mark@example.com", amount: 2000, date: new Date("2024-03-05") },
  ],
  "Education Fund": [
    { email: "mike@example.com", amount: 2500, date: new Date("2024-02-20") },
    { email: "sara@example.com", amount: 1500, date: new Date("2024-03-01") },
  ],
  "Vacation Fund": [
    { email: "alice@example.com", amount: 1500, date: new Date("2024-04-01") },
    { email: "bob@example.com", amount: 1500, date: new Date("2024-04-15") },
  ],
  "Emergency Fund": [
    { email: "paul@example.com", amount: 3000, date: new Date("2024-02-28") },
    { email: "rachel@example.com", amount: 2000, date: new Date("2024-03-10") },
    { email: "tom@example.com", amount: 2000, date: new Date("2024-03-20") },
  ],
};
export { contributionGroups, groupTransactions };
