import { ContributionGroups, GroupTransactions } from "./types";

const contributionGroups: ContributionGroups = {
  "Housing Fund": {
    purpose: "A group for saving towards housing expenses.",
    name: "Housing Fund",
    participants: ["john@example.com", "jane@example.com", "mark@example.com"],
    amount: 5000,
    id: "",
    remaining: 2000,
    admin: "You",
    adminWithdrawal: { initiated: true, initiatedAt: "string" },
    image:
      "https://th.bing.com/th/id/OIP.yD0rXTFB1XM0YI-adDXg2gAAAA?rs=1&pid=ImgDetMain",
  },
  "Education Fund": {
    purpose: "A group dedicated to education-related expenses.",
    name: "Education Fund",
    participants: ["mike@example.com", "sara@example.com"],
    amount: 4000,
    id: "",
    remaining: 1000,
    admin: "",
    adminWithdrawal: { initiated: true, initiatedAt: "string" },
    image: "",
  },
  "Vacation Fund": {
    purpose: "A group for saving towards a vacation trip.",
    name: "Vacation Fund",
    participants: ["alice@example.com", "bob@example.com"],
    amount: 3000,
    id: "",
    remaining: 500,
    admin: "you",
    adminWithdrawal: { initiated: true, initiatedAt: "string" },
    image: "",
  },
  "Emergency Fund": {
    purpose: "A group set up for emergency financial needs.",
    name: "Emergency Fund",
    participants: ["paul@example.com", "rachel@example.com", "tom@example.com"],
    amount: 7000,
    id: "",
    remaining: 3000,
    admin: "",
    adminWithdrawal: { initiated: false, initiatedAt: "string" },
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
