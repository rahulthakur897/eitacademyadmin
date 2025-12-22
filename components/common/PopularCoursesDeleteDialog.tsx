"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Props {
    open: boolean;
    record: any;
    onClose: () => void;
    onConfirm: () => void;
}

export default function PopularCourseDelete({
    open,
    record,
    onClose,
    onConfirm,
}: Props) {
    if (!record) return null;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-sm rounded-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-blue-700">
                        <Trash2 className="text-blue-600 w-5 h-5" />
                        Delete Sub Category
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription className="text-gray-600 text-sm text-center pt-2">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-blue-700">
                        {record?.name}
                    </span>
                    ? This action cannot be undone.
                </DialogDescription>

                <DialogFooter className="mt-4 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={onConfirm}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
