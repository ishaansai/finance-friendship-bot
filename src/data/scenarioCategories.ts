
export interface ScenarioCategory {
  id: string;
  name: string;
  description: string;
  color: string;
}

export const scenarioCategories: ScenarioCategory[] = [
  {
    id: "budget",
    name: "Budgeting",
    description: "Test your budgeting skills in real-life situations",
    color: "bg-blue-100 text-blue-800",
  },
  {
    id: "saving",
    name: "Saving",
    description: "Learn to make saving decisions in various scenarios",
    color: "bg-green-100 text-green-800",
  },
  {
    id: "debt",
    name: "Debt Management",
    description: "Navigate complex debt scenarios and learn best practices",
    color: "bg-red-100 text-red-800",
  },
  {
    id: "invest",
    name: "Investing",
    description: "Practice making investment decisions with simulated scenarios",
    color: "bg-purple-100 text-purple-800",
  },
  {
    id: "emergency",
    name: "Emergency Situations",
    description: "Learn how to handle unexpected financial emergencies",
    color: "bg-amber-100 text-amber-800",
  },
  {
    id: "retirement",
    name: "Retirement Planning",
    description: "Make choices that impact your long-term retirement goals",
    color: "bg-indigo-100 text-indigo-800",
  },
];
