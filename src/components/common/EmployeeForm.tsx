"use client";

import { useEffect, useState } from "react";
import { UserPlus, Calendar as CalendarIcon, Pencil } from "lucide-react";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface EmployeeFormProps {
    open: boolean;
    onClose: () => void;
    onSubmit?: (data: any) => void;
    defaultValues?: any; // Used for editing
}

export default function EmployeeForm({
    open,
    onClose,
    onSubmit,
    defaultValues,
}: EmployeeFormProps) {
    const [name, setName] = useState(defaultValues?.name ?? "");
    const [email, setEmail] = useState(defaultValues?.email ?? "");
    const [phone, setPhone] = useState(defaultValues?.phone ?? "");
    const [position, setPosition] = useState(defaultValues?.position ?? "");
    const [password, setPassword] = useState(defaultValues?.password ?? "");
    const [joiningDate, setJoiningDate] = useState<Date | undefined>(
        defaultValues?.joiningDate ? new Date(defaultValues.joiningDate) : undefined
    );

    // Reset or Load Values
    useEffect(() => {
        if (defaultValues) {
            setName(defaultValues.name || "");
            setEmail(defaultValues.email || "");
            setPhone(defaultValues.phone || "");
            setPosition(defaultValues.position || "");
            setPassword(defaultValues.password || "");
            setJoiningDate(
                defaultValues.joiningDate
                    ? new Date(defaultValues.joiningDate)
                    : undefined
            );
        } else {
            setName("");
            setEmail("");
            setPhone("");
            setPosition("");
            setPassword("");
            setJoiningDate(undefined);
        }
    }, [defaultValues, open]);

    // Submit
    const handleSave = () => {
        const newEmployee = {
            name,
            email,
            phone,
            position,
            password,
            joiningDate: joiningDate
                ? joiningDate.toISOString().split("T")[0]
                : null,
        };

        onSubmit?.(newEmployee);
        onClose();
    };

    return (
        <Sheet open={open} onOpenChange={onClose}>
            <SheetContent side="right" className="w-[40%] p-6 space-y-6">
                <SheetHeader className="p-0">
                    <SheetTitle className="text-red-600 font-semibold flex items-center gap-2">
                        {defaultValues ? (
                            <Pencil className="h-5 w-5 text-red-600" />
                        ) : (
                            <UserPlus className="h-5 w-5 text-red-600" />
                        )}
                        {defaultValues ? "Edit Employee" : "Add Employee"}
                    </SheetTitle>
                </SheetHeader>

                <div className="space-y-5">
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Name</Label>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter employee name"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@mysrl.com"
                        />
                    </div>
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Phone</Label>
                        <Input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="9876543210"
                        />
                    </div>

                    {/* POSITION */}
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Position</Label>
                        <Input
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            placeholder="Ex: Manager, Supervisor, Sales Rep"
                        />
                    </div>

                    {/* PASSWORD */}
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Password</Label>
                        <Input
                            type="text"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Employee password"
                        />
                    </div>

                    {/* JOINING DATE */}
                    <div className="space-y-1">
                        <Label className="text-sm font-semibold text-gray-800">Joining Date</Label>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-full justify-between text-left font-normal",
                                        !joiningDate && "text-muted-foreground"
                                    )}
                                >
                                    {joiningDate
                                        ? joiningDate.toDateString()
                                        : "Pick a date"}

                                    <CalendarIcon className="h-4 w-4 opacity-60" />
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={joiningDate}
                                    onSelect={setJoiningDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-end gap-2 pt-4">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>

                    <Button className="bg-red-600 text-white hover:bg-red-700" onClick={handleSave}>
                        {defaultValues ? "Update" : "Save"}
                    </Button>
                </div>
            </SheetContent>
        </Sheet>
    );
}
