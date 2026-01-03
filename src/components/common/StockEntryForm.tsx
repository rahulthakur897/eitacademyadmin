"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Plus, Pencil } from "lucide-react";

interface StockEntryFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  defaultValues?: any;
}

export default function StockEntryForm({
  open,
  onClose,
  onSubmit,
  defaultValues,
}: StockEntryFormProps) {
  const [form, setForm] = useState({
    model_name: "",
    prod_sr_no: "",
    company_name: "",
    product_category: "",
    product_sub_category: "",
    mrp: "",
    dealer_price: "",
    sell_out: "",
    sell_out_combo: "",
    wholesale_price: "",
  });

  useEffect(() => {
    if (defaultValues) setForm(defaultValues);
    else
      setForm({
        model_name: "",
        prod_sr_no: "",
        company_name: "",
        product_category: "",
        product_sub_category: "",
        mrp: "",
        dealer_price: "",
        sell_out: "",
        sell_out_combo: "",
        wholesale_price: "",
      });
  }, [defaultValues]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[45%] p-6 space-y-2">
        <SheetHeader className="p-0">
          <SheetTitle className="text-red-600 font-semibold flex items-center gap-2">
            {defaultValues ? (
              <>
                <Pencil className="w-5 h-5" />
                Edit Stock
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Add Stock
              </>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-2 gap-5">
          <div className="space-y-2 col-span-2">
            <Label className="text-sm font-semibold">Model Name</Label>
            <Input
              value={form.model_name}
              onChange={(e) => handleChange("model_name", e.target.value)}
              placeholder="Enter model name"
            />
          </div>

          {/* SERIAL NUMBER */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Serial Number</Label>
            <Input
              value={form.prod_sr_no}
              onChange={(e) => handleChange("prod_sr_no", e.target.value)}
            />
          </div>

          {/* COMPANY */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Company</Label>
            <Input
              value={form.company_name}
              onChange={(e) => handleChange("company_name", e.target.value)}
            />
          </div>

          {/* CATEGORY */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Category</Label>
            <Input
              value={form.product_category}
              onChange={(e) => handleChange("product_category", e.target.value)}
            />
          </div>

          {/* SUB CATEGORY */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Sub Category</Label>
            <Input
              value={form.product_sub_category}
              onChange={(e) =>
                handleChange("product_sub_category", e.target.value)
              }
            />
          </div>

          {/* MRP */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">MRP</Label>
            <Input
              type="number"
              value={form.mrp}
              onChange={(e) => handleChange("mrp", e.target.value)}
            />
          </div>

          {/* DEALER PRICE */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Dealer Price</Label>
            <Input
              type="number"
              value={form.dealer_price}
              onChange={(e) => handleChange("dealer_price", e.target.value)}
            />
          </div>

          {/* SELL OUT */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Sell Out</Label>
            <Input
              type="number"
              value={form.sell_out}
              onChange={(e) => handleChange("sell_out", e.target.value)}
            />
          </div>

          {/* SELL OUT COMBO */}
          <div className="space-y-2">
            <Label className="text-sm font-semibold">Sell Out Combo</Label>
            <Input
              type="number"
              value={form.sell_out_combo}
              onChange={(e) => handleChange("sell_out_combo", e.target.value)}
            />
          </div>

          {/* WHOLESALE PRICE - FULL WIDTH */}
          <div className="space-y-2 col-span-2">
            <Label className="text-sm font-semibold">Wholesale Price</Label>
            <Input
              type="number"
              value={form.wholesale_price}
              onChange={(e) =>
                handleChange("wholesale_price", e.target.value)
              }
            />
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleSave}
          >
            {defaultValues ? "Save Changes" : "Add Model"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
