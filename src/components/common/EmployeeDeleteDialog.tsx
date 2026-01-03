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

interface DeleteEmployeeDialogProps {
    open: boolean;
    employee: any; // selected employee object
    onClose: () => void;
    onConfirm: () => void;
}

export default function DeleteEmployee({
    open,
    employee,
    onClose,
    onConfirm
}: DeleteEmployeeDialogProps) {
    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm">
                <DialogHeader className="flex flex-col items-center text-center space-y-3">
                    <div className="text-red-600">
                        <Trash2 className="h-8 w-8" />
                    </div>
                    <DialogTitle className="text-lg font-semibold text-red-700">
                        Delete Employee
                    </DialogTitle>
                    <DialogDescription className="text-gray-600 text-m text-center">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-red-700">
                            {employee?.name}
                        </span>
                        ? This action cannot be undone.
                    </DialogDescription>

                </DialogHeader>

                <DialogFooter className="mt-4 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button
                        className="bg-red-600 text-white hover:bg-red-700"
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
