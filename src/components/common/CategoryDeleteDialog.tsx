"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface DeletecategoryDialogProps {
    open: boolean;
    category: any;
    onClose: () => void;
    onConfirm: () => void;
}

export default function Deletecategory({
    open,
    category,
    onClose,
    onConfirm
}: DeletecategoryDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader className="flex flex-col items-center text-center space-y-3">

                    {/* Icon */}
                    <div className="text-blue-600">
                        <Trash2 className="h-8 w-8" />
                    </div>

                    {/* Title */}
                    <DialogTitle className="text-lg font-semibold text-blue-700">
                        Delete Category
                    </DialogTitle>

                    {/* Description */}
                    <DialogDescription className="text-gray-600 text-m text-center">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-blue-700">
                            {category?.name}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>

                {/* Footer */}
                <DialogFooter className="mt-4 flex justify-end gap-3">

                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                        Cancel
                    </Button>

                    <Button
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
