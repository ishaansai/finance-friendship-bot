
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ExpenseChartProps {
  data: {
    category: string;
    amount: number;
  }[];
}

const COLORS = ['#4299E1', '#667EEA', '#38B2AC', '#48BB78', '#ED8936', '#ED64A6', '#9F7AEA', '#F56565', '#ECC94B', '#4C51BF', '#D53F8C', '#805AD5'];

const ExpenseChart = ({ data }: ExpenseChartProps) => {
  // Sort data by amount (descending)
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={sortedData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="amount"
          nameKey="category"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          animationDuration={500}
          animationBegin={0}
        >
          {sortedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          formatter={(value: number) => [`$${value.toFixed(2)}`, 'Amount']}
          contentStyle={{ 
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            padding: '8px 12px',
          }} 
        />
        <Legend 
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: '20px',
            fontSize: '12px',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpenseChart;
