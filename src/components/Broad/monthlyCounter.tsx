"use client"
import useMonthlyCounterStore from '@/store/monthlyCounter';
import { getDatesOfMonth } from '@/utils/dateHelper';
import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import useMonthlyDatesStore from '@/store/monthlyDates';
// Adjust the path accordingly

const BroadMonthlyCounter: React.FC = () => {
    const { count, increment, decrement } = useMonthlyCounterStore();
    const { currentDates, previousDates, setCurrentDates, setPreviousDates } = useMonthlyDatesStore()
    useEffect(() => {
        const currentDate = getDatesOfMonth(count)
        const previousDate = getDatesOfMonth(count - 1)
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

export default BroadMonthlyCounter;
