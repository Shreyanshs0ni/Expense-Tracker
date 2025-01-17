import { PiggyBank, Receipt, ReceiptText, Wallet } from "lucide-react";
import React, { useEffect, useState, useCallback } from "react";

const CardInfo = ({ budgetList }) => {
  const [totalBudget, setTotalBudget] = useState(0);
  const [totalSpend, setTotalSpend] = useState(0);

  const calculateCardInfo = useCallback(() => {
    console.log(budgetList);
    let totalBudget_ = 0;
    let totalSpend_ = 0;
    budgetList.forEach((element) => {
      totalBudget_ += Number(element.amount);
      totalSpend_ += element.totalSpend ?? 0;
    });

    setTotalBudget(totalBudget_);
    setTotalSpend(totalSpend_);
    console.log(totalBudget_, totalSpend_);
  }, [budgetList]);

  useEffect(() => {
    if (budgetList) calculateCardInfo();
  }, [calculateCardInfo, budgetList]);

  return (
    <div>
      {budgetList?.length > 0 ? (
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center justify-between rounded-lg border p-7">
            <div>
              <h2 className="text-sm">Total Budget</h2>
              <h2 className="text-2xl font-bold">${totalBudget}</h2>
            </div>
            <PiggyBank className="h-12 w-12 rounded-full bg-primary p-3 text-white" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-7">
            <div>
              <h2 className="text-sm">Total Spend</h2>
              <h2 className="text-2xl font-bold">${totalSpend}</h2>
            </div>
            <ReceiptText className="h-12 w-12 rounded-full bg-primary p-3 text-white" />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-7">
            <div>
              <h2 className="text-sm">No. of Budgets</h2>
              <h2 className="text-2xl font-bold">{budgetList?.length}</h2>
            </div>
            <Wallet className="h-12 w-12 rounded-full bg-primary p-3 text-white" />
          </div>
        </div>
      ) : (
        <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[110px] w-full animate-pulse rounded-lg bg-slate-200"
            >
              {" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardInfo;
