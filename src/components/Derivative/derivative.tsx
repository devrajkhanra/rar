"use client";
import { Button } from "../ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "../ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sector } from "../Sector/sector";
import CEForm from "./ceForm";
import PEForm from "./peForm";

export function Derivative() {
    return (
        <div className="grid w-full grid-cols-2">
            <CEForm />
            <PEForm />
        </div>
    );
}
