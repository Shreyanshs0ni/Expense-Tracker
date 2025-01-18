"use client";
import { useCallback, useEffect, useState } from "react";
import CardInfo from "./_components/CardInfo";
import BarChartDashboard from "./_components/BarChartDashboard";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/dbConfig";
import { desc, eq, getTableColumns, sql } from "drizzle-orm";
import { Budgets, Expenses } from "@/utils/schema";
import { BarChart } from "recharts";
import BudgetItem from "./budgets/_components/BudgetItem";
import { createDeflate } from "zlib";
import ExpenseListTable from "./expenses/_components/ExpenseListTable";

const Dashboard = () => {
  const [budgetList, setBudgetList] = useState();
  const [expensesList, setExpensesList] = useState([]);
  const { user } = useUser();
  console.log(user);

  const getBudgetList = useCallback(async () => {
    const result = await db
      .select({
        ...getTableColumns(Budgets),
        totalSpend: sql`sum(${Expenses.amount})`
          .mapWith(Number)
          .as("totalSpend"),
        totalItem: sql`count(${Expenses.id})`.mapWith(Number).as("totalItem"),
      })
      .from(Budgets)
      .leftJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress?.emailAddress))
      .groupBy(Budgets.id)
      .orderBy(desc(Budgets.id));
    getAllExpenses();
    setBudgetList(result);
  }, [user]);

  useEffect(() => {
    user && getBudgetList();
  }, [user, getBudgetList]);

  //used to get all the expenses of user
  const getAllExpenses = async () => {
    const result = await db
      .select({
        id: Expenses.id,
        name: Expenses.name,
        amount: Expenses.amount,
        createdAt: Expenses.createdAt,
      })
      .from(Budgets)
      .rightJoin(Expenses, eq(Budgets.id, Expenses.budgetId))
      .where(eq(Budgets.createdBy, user?.primaryEmailAddress.emailAddress))
      .orderBy(desc(Expenses.id));
    setExpensesList(result);
    console.log("result", result);
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold">Hi, {user?.fullName} 💜</h2>
      <p className="mt-2 text-gray-500">
        Here&apos;s what happening with your money, lets Manage your expenses
      </p>

      <CardInfo budgetList={budgetList} />
      <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <BarChartDashboard budgetList={budgetList} />
          <h2 className="my-2 text-lg font-bold">Latest Expenses</h2>

          <ExpenseListTable
            expensesList={expensesList}
            refreshData={() => getBudgetList()}
          />
        </div>
        <div className="grid">
          <h2 className="text-lg font-bold">Latest Budgets</h2>
          {budgetList ? (
            budgetList.map((budget, index) => {
              return <BudgetItem budget={budget} key={index} />;
            })
          ) : (
            <p>No budgets available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
