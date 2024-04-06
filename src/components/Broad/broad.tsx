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
import BroadMonthlyCounter from "./monthlyCounter";
import { BroadMonthlyVolume } from "./monthlyVolume";
import SectorialMonthlyCounter from "../Sector/monthlyCounter";
import { Sector } from "../Sector/sector";
import BroadWeeklyCounter from "./weeklyCounter";
import { BroadWeeklyVolume } from "./weeklyVolume";

export function Broad() {
    return (
        <div className="grid w-full grid-cols-4">
            <Card>
                <CardHeader>
                    <CardTitle>Broad Indices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                    <div className="space-y-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Monthly Volume</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BroadMonthlyCounter />
                                <BroadMonthlyVolume />
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle>Weekly Volume</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <BroadWeeklyCounter />
                                <BroadWeeklyVolume />
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
            <Sector />
        </div>
    );
}
