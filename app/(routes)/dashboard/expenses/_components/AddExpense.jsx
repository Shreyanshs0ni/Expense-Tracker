import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Expenses } from "@/utils/schema";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import React, { useState } from "react";
import { toast } from "sonner";
import moment from "moment";

const AddExpense = ({ budgetId, user, refreshData }) => {
  const [name, setName] = useState();
  const [amount, setAmount] = useState();
  const addNewExpense = async () => {
    const result = await db
      .insert(Expenses)
      .values({
        name: name,
        amount: amount,
        budgetId: budgetId,
        createdAt: moment().format("DD/MM/yyy"),
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      refreshData();
      toast("New Expense Added!");
    }
  };

  return (
    <div className="rounded-lg border p-5">
      <h2 className="text-lg font-bold">Add Expense</h2>
      <div className="mt-2">
        <h2 className="my-2 font-medium text-black">Expense Name</h2>
        <Input
          placeholder="e.g. Bedroom Decor"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </div>
      <div className="mt-2">
        <h2 className="my-2 font-medium text-black">Expense Amount</h2>
        <Input
          placeholder="e.g. 1000$"
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        ></Input>
      </div>
      <Button
        disabled={!(name && amount)}
        className="mt-3 w-full"
        onClick={addNewExpense}
      >
        Add New Expense
      </Button>
    </div>
  );
};

export default AddExpense;
