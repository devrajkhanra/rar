"use client"
import useWeeklyCounterStore from '@/store/weeklyCounter';
import { getDatesOfWeek } from '@/utils/dateHelper';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useWeeklyDatesStore from '@/store/weeklyDates';
// Adjust the path accordingly

const SectorialWeeklyCounter: React.FC = () => {
    const { count, increment, decrement } = useWeeklyCounterStore();
    const { currentDates, previousDates, setCurrentDates, setPreviousDates } = useWeeklyDatesStore()
    useEffect(() => {
        const currentDate = getDatesOfWeek(count)
        const previousDate = getDatesOfWeek(count - 1)
        setCurrentDates(currentDate)
        setPreviousDates(previousDate)
    }, [count])

    return (
        <div className='flex items-center gap-3'>
            <Button size={'icon'} variant={'ghost'} onClick={decrement}><ArrowLeft /></Button>
            <p>Count: {count}</p>
            <Button size={'icon'} variant={'ghost'} onClick={increment}><ArrowRight /></Button>
            {/* <ul>
                {dates.map(date => (
                    <li key={date}>{date}</li>
                ))}
            </ul> */}
        </div>
    );
};

export default SectorialWeeklyCounter;
