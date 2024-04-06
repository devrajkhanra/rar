"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle, Check, Download, RotateCw } from "lucide-react";
import { Button } from "./ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";
import { useLastUpdatedStore } from "@/store/useLastUpdated";
import axios from "axios";
import { format } from "date-fns";
import { useToast } from "./ui/use-toast";

export function DownloadData() {
    const { lastUpdatedDate, loading, error, fetchLastUpdatedDate } =
        useLastUpdatedStore();
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [downloadInProgress, setDownloadInProgress] = useState<boolean>(false);
    const { toast } = useToast();

    useEffect(() => {
        fetchLastUpdatedDate();
    }, []);

    const formatDate = (date: string): string => {
        const [year, month, day] = date.split("-");
        return `${day}${month}${year}`;
    };

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(event.target.value);
    };

    const handleDownload = async () => {
        if (!selectedDate) return; // Do nothing if no date is selected
        setDownloadInProgress(true); // Start download, show spinner
        const dateStr = formatDate(selectedDate);
        const dateStrOption = format(selectedDate, "ddMMMyyyy").toUpperCase();
        const optionURL = `C:/Users/Rar/Desktop/fo/fo${dateStrOption}bhav.csv.zip`;
        const indiceURL = `https://archives.nseindia.com/content/indices/ind_close_all_${dateStr}.csv`;
        const stockURL = `https://archives.nseindia.com/products/content/sec_bhavdata_full_${dateStr}.csv`;

        try {
            await axios.post("/api/parseAndSaveData", {
                optionURL,
                indiceURL,
                stockURL,
                dateStr,
            });
            // Show success message in card footer
            setDownloadInProgress(false); // Download completed, hide spinner
            // Fetch last updated date again
            fetchLastUpdatedDate();
        } catch (error) {
            console.error("Error downloading data:", error);
            // Handle error here
            setDownloadInProgress(false); // Download failed, hide spinner
        }
    };

    return (
        <div className="grid w-full grid-cols-4">
            <Card>
                <CardHeader>
                    <CardTitle>Download NSE Data</CardTitle>
                    <CardDescription>
                        Select next date from the updated date and click download
                    </CardDescription>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-2 py-4">
                    <div className="flex gap-3 items-center">
                        <Label htmlFor="last">Last Updated:</Label>
                        <CardDescription>
                            {loading ? (
                                <RotateCw className="animate-spin" size={16} />
                            ) : error ? (
                                <AlertCircle size={16} />
                            ) : (
                                <p>{lastUpdatedDate}</p>
                            )}
                        </CardDescription>
                    </div>
                    <Separator />
                    <div className="space-y-1">
                        <Label htmlFor="select">Select Date</Label>
                        <div className="flex gap-2">
                            <Input
                                type="date"
                                id="select"
                                onChange={handleDateChange}
                                value={selectedDate}
                            />
                            <Button
                                size={"icon"}
                                variant={"outline"}
                                onClick={handleDownload}
                                disabled={!selectedDate || downloadInProgress}
                            >
                                {downloadInProgress ? (
                                    <RotateCw className="animate-spin" size={16} />
                                ) : (
                                    <Download size={16} />
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
