"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Broad } from "./Broad/broad"
import { Auto } from "./Auto/auto"
import { DownloadData } from "./downloadData"
import { Atom, BadgeDollarSign, Cable, Download, PackageOpen, PiggyBank, ShoppingCart, Tractor } from "lucide-react"
import { Derivative } from "./Derivative/derivative"

export function Header() {
    return (
        <Tabs defaultValue="account" className="w-full">
            <TabsList className="grid w-full grid-cols-12">
                <TabsTrigger value="broad" className="gap-3"><PackageOpen /> Broad</TabsTrigger>
                <TabsTrigger value="auto" className="gap-3"><Tractor /> Auto</TabsTrigger>
                <TabsTrigger value="bank" className="gap-3"><PiggyBank /> Bank</TabsTrigger>
                <TabsTrigger value="consumer" className="gap-3"><Cable /> Consumer</TabsTrigger>
                <TabsTrigger value="energy" className="gap-3"><Atom /> Energy</TabsTrigger>
                <TabsTrigger value="fin" className="gap-3"><BadgeDollarSign /> Finance</TabsTrigger>
                <TabsTrigger value="fmcg" className="gap-3"><ShoppingCart /> Fmcg</TabsTrigger>
                <TabsTrigger value="download" className="gap-3"><Download /> Download</TabsTrigger>
                <TabsTrigger value="derivatives" className="gap-3"><Download /> Derivatives</TabsTrigger>
            </TabsList>
            <TabsContent value="broad">
                <Broad />
            </TabsContent>
            <TabsContent value="auto">
                <Auto />
            </TabsContent>
            <TabsContent value="download">
                <DownloadData />
            </TabsContent>
            <TabsContent value="derivatives">
                <Derivative />
            </TabsContent>
        </Tabs>
    )
}
