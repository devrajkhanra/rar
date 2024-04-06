"use client"
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../ui/card";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectorialMonthlyVolume } from "./monthlyVolume";
import SectorialMonthlyCounter from "./monthlyCounter";
import { SectorialWeeklyVolume } from "./weeklyVolume";
import SectorialWeeklyCounter from "./weeklyCounter";



export function Sector() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sectorial Indices</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SectorialMonthlyCounter />
                            <SectorialMonthlyVolume />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Volume</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <SectorialWeeklyCounter />
                            <SectorialWeeklyVolume />
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    )
}