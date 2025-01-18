import { db } from "@/utils/dbConfig";
import { Expenses } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Trash } from "lucide-react";
import React from "react";
import { toast } from "sonner";

const ExpenseListTable = ({ expensesList, refreshData }) => {
  const deleteExpense = async (expense) => {
    const result = await db
      .delete(Expenses)
      .where(eq(Expenses.id, expense.id))
      .returning();

    if (result) {
      toast("Expense Deleted!");
      refreshData();
    }
  };
  return (
    <div className="mt-4">
      <div className="grid grid-cols-4 bg-purple-200 p-2">
        <h2 className="font-bold">Name</h2>
        <h2 className="font-bold">Amount</h2>
        <h2 className="font-bold">Date</h2>
        <h2 className="font-bold">Action</h2>
      </div>
      {expensesList && expensesList.length > 0 ? (
        expensesList.map((expenses) => (
          <div className="grid grid-cols-4 bg-purple-100 p-2" key={expenses.id}>
            <h2>{expenses.name}</h2>
            <h2>${expenses.amount}</h2>
            <h2>{expenses.createdAt}</h2>
            <h2>
              <Trash
                onClick={() => deleteExpense(expenses)}
                className="ml-3 cursor-pointer text-red-600"
              />
            </h2>
          </div>
        ))
      ) : (
        <div className="ml-1 mt-1">No expenses available.</div>
      )}
    </div>
  );
};

export default ExpenseListTable;
