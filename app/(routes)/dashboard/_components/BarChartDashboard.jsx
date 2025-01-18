import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  return (
    <div className="rounded-lg border p-5">
      <h2 className="mb-2 text-lg font-bold">Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart data={budgetList} margin={{ top: 7 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#e5cef7 " />
          <Bar dataKey="totalSpend" fill="#CB9DF0  " />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
