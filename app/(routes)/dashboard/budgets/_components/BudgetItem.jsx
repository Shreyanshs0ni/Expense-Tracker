import React from "react";

const BudgetItem = ({ budget }) => {
  return (
    <div className="cursor-pointer rounded-lg border p-5 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="rounded-full bg-slate-100 p-3 text-3xl">
            {budget?.icon}
          </h2>
          <div>
            <h2 className="font-bold">{budget.name}</h2>
            <h2 className="text-sm text-gray-500">{budget.totalItem} Item</h2>
          </div>
        </div>

        <h2 className="text-lg font-bold text-primary"> ${budget.amount}</h2>
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-xs text-slate-400">
            ${budget.totalSpend ? budget.totalItem : 0} Spent
          </h2>
          <h2 className="text-xs text-slate-400">
            ${budget.amount - budget.totalSpend} Remaining
          </h2>
        </div>
        <div className="h-2 w-full rounded-full bg-slate-300">
          <div className="h-2 w-[40%] rounded-full bg-primary"></div>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
