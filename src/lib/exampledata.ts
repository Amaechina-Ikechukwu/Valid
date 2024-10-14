import { ContributionGroups, GroupTransactions } from "./types";

const contributionGroups: ContributionGroups = {
  "Housing Fund": {
    description: "A group for saving towards housing expenses.",
    name: "Housing Fund",
    participantsEmails: [
      "john@example.com",
      "jane@example.com",
      "mark@example.com",
    ],
    total: 5000,
    remaining: 2000,
    admin: "You",
    adminWithdrawal: false,
    image:
      "https://th.bing.com/th/id/OIP.yD0rXTFB1XM0YI-adDXg2gAAAA?rs=1&pid=ImgDetMain",
  },
  "Education Fund": {
    description: "A group dedicated to education-related expenses.",
    name: "Education Fund",
    participantsEmails: ["mike@example.com", "sara@example.com"],
    total: 4000,
    remaining: 1000,
    admin: "",
    adminWithdrawal: true,
    image: "",
  },
  "Vacation Fund": {
    description: "A group for saving towards a vacation trip.",
    name: "Vacation Fund",
    participantsEmails: ["alice@example.com", "bob@example.com"],
    total: 3000,
    remaining: 500,
    admin: "you",
    adminWithdrawal: true,
    image: "",
  },
  "Emergency Fund": {
    description: "A group set up for emergency financial needs.",
    name: "Emergency Fund",
    participantsEmails: [
      "paul@example.com",
      "rachel@example.com",
      "tom@example.com",
    ],
    total: 7000,
    remaining: 3000,
    admin: "",
    adminWithdrawal: false,
    image: "",
  },
};
const groupTransactions: GroupTransactions = {
  "Housing Fund": [
    { email: "john@example.com", amount: 1000, date: "2024-01-15" },
    { email: "jane@example.com", amount: 2000, date: "2024-02-10" },
    { email: "mark@example.com", amount: 2000, date: "2024-03-05" },
  ],
  "Education Fund": [
    { email: "mike@example.com", amount: 2500, date: "2024-02-20" },
    { email: "sara@example.com", amount: 1500, date: "2024-03-01" },
  ],
  "Vacation Fund": [
    { email: "alice@example.com", amount: 1500, date: "2024-04-01" },
    { email: "bob@example.com", amount: 1500, date: "2024-04-15" },
  ],
  "Emergency Fund": [
    { email: "paul@example.com", amount: 3000, date: "2024-02-28" },
    { email: "rachel@example.com", amount: 2000, date: "2024-03-10" },
    { email: "tom@example.com", amount: 2000, date: "2024-03-20" },
  ],
};
export { contributionGroups, groupTransactions };
