"use client";

import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  open: boolean;
  mode: "add" | "edit";
  record: any;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function PriceListForm({
  open,
  mode,
  record,
  onClose,
  onSave,
}: Props) {
  const [form, setForm] = useState({
    model_name: "",
    mrp: "",
    dealer_price: "",
    sell_out: "",
    sell_out_combo: "",
    wholesale_price: "",
  });

  // Prefill in edit mode
  useEffect(() => {
    if (mode === "edit" && record) {
      setForm(record);
    } else {
      setForm({
        model_name: "",
        mrp: "",
        dealer_price: "",
        sell_out: "",
        sell_out_combo: "",
        wholesale_price: "",
      });
    }
  }, [mode, record]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave({
      ...form,
      mrp: Number(form.mrp),
      dealer_price: Number(form.dealer_price),
      sell_out: Number(form.sell_out),
      sell_out_combo: Number(form.sell_out_combo),
      wholesale_price: Number(form.wholesale_price),
    });
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[380px] p-6">
        <SheetHeader>
          <SheetTitle className="text-red-700 font-semibold">
            {mode === "add" ? "Add Price" : "Edit Price"}
          </SheetTitle>
          <SheetDescription>
            Enter pricing details of the product model.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 flex flex-col gap-4">

          {/* MODEL NAME */}
          <div>
            <label className="text-sm font-medium">Model Name</label>
            <Input
              name="model_name"
              value={form.model_name}
              onChange={handleChange}
              placeholder="Enter model name"
              className="border-red-500 focus:ring-red-600"
            />
          </div>

          {/* MRP */}
          <div>
            <label className="text-sm font-medium">MRP</label>
            <Input
              name="mrp"
              type="number"
              value={form.mrp}
              onChange={handleChange}
              placeholder="Enter MRP"
              className="border-red-500 focus:ring-red-600"
            />
          </div>

          {/* Dealer Price */}
          <div>
            <label className="text-sm font-medium">Dealer Price</label>
            <Input
              name="dealer_price"
              type="number"
              value={form.dealer_price}
              onChange={handleChange}
              placeholder="Enter dealer price"
              className="border-red-500 focus:ring-red-600"
            />
          </div>

          {/* Sell Out */}
          <div>
            <label className="text-sm font-medium">Sell Out</label>
            <Input
              name="sell_out"
              type="number"
              value={form.sell_out}
              onChange={handleChange}
              placeholder="Enter sell out"
              className="border-red-500 focus:ring-red-600"
            />
          </div>

          {/* Sell Out Combo */}
          <div>
            <label className="text-sm font-medium">Sell Out Combo</label>
            <Input
              name="sell_out_combo"
              type="number"
              value={form.sell_out_combo}
              onChange={handleChange}
              placeholder="Enter combo price"
              className="border-red-500 focus:ring-red-600"
            />
          </div>

          {/* Wholesale Price */}
          <div>
            <label className="text-sm font-medium">Wholesale Price</label>
            <Input
              name="wholesale_price"
              type="number"
              value={form.wholesale_price}
              onChange={handleChange}
              placeholder="Enter wholesale price"
              className="border-red-500 focus:ring-red-600"
            />
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {mode === "add" ? "Add" : "Update"}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
