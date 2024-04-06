import React, { useEffect, useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';
import useWeeklyDatesStore from "@/store/weeklyDates";
import axios, { AxiosResponse } from "axios";

interface WeeklyResponse {
    [key: string]: { Volume: number }[];
}

export function SectorialWeeklyVolume() {
    const { currentDates, previousDates } = useWeeklyDatesStore();
    const [volumeRatios, setVolumeRatios] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const abortController1 = new AbortController();
        const signal1 = abortController1.signal;
        const abortController2 = new AbortController();
        const signal2 = abortController2.signal;

        const fetchWeeklyVolume = async (dates: string[], signal: AbortSignal) => {
            try {
                const response = await axios.post('/api/weeklyIndice', {
                    collectionNames: ['NIFTYAUTO', 'NIFTYBANK', 'NIFTYFINANCIALSERVICES', 'NIFTYFMCG', 'NIFTYHEALTHCAREINDEX', 'NIFTYIT', 'NIFTYMEDIA', 'NIFTYMETAL', 'NIFTYPHARMA', 'NIFTYPRIVATEBANK', 'NIFTYPSUBANK', 'NIFTYREALTY', 'NIFTYCONSUMERDURABLES', 'NIFTYOIL&GAS'],
                    dates,
                }, { signal });
                return response.data;
            } catch (error) {
                console.error('Error fetching weekly volume:', error);
                throw error;
            }
        };

        const fetchVolumeRatios = async () => {
            try {
                const previousResponse = await fetchWeeklyVolume(previousDates, signal1);
                const currentResponse = await fetchWeeklyVolume(currentDates, signal2);

                const previousMaxVolumes = getMaxVolumes(previousResponse);
                const currentMaxVolumes = getMaxVolumes(currentResponse);

                const ratios: { [key: string]: number } = {};
                for (const key in currentMaxVolumes) {
                    if (currentMaxVolumes.hasOwnProperty(key) && previousMaxVolumes.hasOwnProperty(key)) {
                        ratios[key] = currentMaxVolumes[key] / previousMaxVolumes[key];
                    }
                }
                setVolumeRatios(ratios);
            } catch (error) {
                console.error('Error fetching volume ratios:', error);
            }
        };

        fetchVolumeRatios();

        return () => {
            abortController1.abort();
            abortController2.abort();
        };
    }, [previousDates, currentDates]);

    const getMaxVolumes = (response: WeeklyResponse): { [key: string]: number } => {
        const maxVolumes: { [key: string]: number } = {};
        for (const key in response) {
            if (response.hasOwnProperty(key)) {
                const maxVolume = Math.max(...response[key].map(item => item.Volume));
                maxVolumes[key] = maxVolume;
            }
        }
        return maxVolumes;
    };

    const chartData = Object.keys(volumeRatios).map(key => ({
        name: key,
        ratio: volumeRatios[key]
    }));

    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
                <XAxis dataKey="name" angle={-45} fontSize={10} />
                <YAxis />
                <Tooltip />
                <Legend />
                <ReferenceLine y={1} stroke="#000" />
                <Bar dataKey="ratio" fill="#080bbf" barSize={20} />
            </BarChart>
        </ResponsiveContainer>
    );
}
