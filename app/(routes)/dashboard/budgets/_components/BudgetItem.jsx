import React from "react";

const BudgetItem = ({ budget }) => {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h2 className="rounded-full bg-slate-100 p-2 text-3xl">
          {budget?.icon}
        </h2>
        <div>
          <h2>{budget.name}</h2>
          <h2>{budget.totalItem} Item</h2>
        </div>
      </div>
    </div>
  );
};

export default BudgetItem;
