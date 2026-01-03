"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
  open: boolean;
  record: any;
  onClose: () => void;
  onConfirm: () => void;
}

export default function PriceListDelete({
  open,
  record,
  onClose,
  onConfirm,
}: Props) {

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex flex-col items-center gap-2 text-red-700">
            <Trash2 className="w-6 h-6 text-red-600 mb-2" />
            Delete Price Entry
          </DialogTitle>
        </DialogHeader>

        <p className="text-l text-gray-700 mb-3 font-bold">
          Are you sure you want to delete this price list entry?
        </p>

        {/* DETAILS CARD */}
        <div className="bg-gray-100 p-3 rounded-md text-sm space-y-1">
          <div>
            <span className="font-semibold text-gray-800">Model Name:</span>{" "}
            {record?.model_name}
          </div>
          <div>
            <span className="font-semibold text-gray-800">MRP:</span>{" "}
            ₹{record?.mrp.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Dealer Price:</span>{" "}
            ₹{record?.dealer_price.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Sell Out:</span>{" "}
            ₹{record?.sell_out.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Sell Out Combo:</span>{" "}
            ₹{record?.sell_out_combo.toLocaleString()}
          </div>
          <div>
            <span className="font-semibold text-gray-800">Wholesale Price:</span>{" "}
            ₹{record?.wholesale_price.toLocaleString()}
          </div>
        </div>

        <DialogFooter className="mt-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>

          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
