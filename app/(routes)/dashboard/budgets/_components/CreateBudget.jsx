"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import React from "react";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { Budgets } from "@/utils/schema";

const CreateBudget = ({ setBudgetList }) => {
  const [emojiIcon, setEmojiIcon] = useState("😃");
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);

  const { user } = useUser();

  const onCreateBudget = async () => {
    setBudgetList((prev) => [
      ...prev,
      {
        name,
        amount,
        icon: emojiIcon,
      },
    ]);

    const result = await db
      .insert(Budgets)
      .values({
        name: name,
        amount: amount,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        icon: emojiIcon,
      })
      .returning({ insertedId: Budgets.id });

    if (result) {
      toast("New Budget Created!");
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex cursor-pointer flex-col items-center rounded-md border-2 border-dashed bg-slate-100 p-10 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  className="text-2xl"
                  onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                >
                  {emojiIcon}
                </Button>
                <div className="absolute z-10">
                  <EmojiPicker
                    open={openEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="mt-2">
                  <h2 className="my-2 font-medium text-black">Budget Name</h2>
                  <Input
                    placeholder="e.g. Home Decor"
                    onChange={(e) => setName(e.target.value)}
                  ></Input>
                </div>
                <div className="mt-2">
                  <h2 className="my-2 font-medium text-black">Budget Amount</h2>
                  <Input
                    placeholder="e.g. 5000$"
                    type="number"
                    onChange={(e) => setAmount(e.target.value)}
                  ></Input>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                disabled={!(name && amount)}
                className="mt-5 w-full"
                onClick={() => onCreateBudget()}
              >
                Create Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateBudget;
