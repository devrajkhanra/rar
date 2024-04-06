

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button } from '../ui/button';
// import { Label } from '../ui/label';

// const CEForm = () => {
//     const [collectionName, setCollectionName] = useState('');
//     const [instrument, setInstrument] = useState('');
//     const [expiryDates, setExpiryDates] = useState<string[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedYear, setSelectedYear] = useState<string>('');
//     const [selectedMonth, setSelectedMonth] = useState<string>('');

//     const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         try {
//             const response = await axios.get<{ expiryDates: string[] }>('/api/expiryDates', {
//                 params: {
//                     collectionName,
//                     instrument
//                 }
//             });
//             const uniqueExpiryDates = Array.from(new Set(response.data.expiryDates));
//             setExpiryDates(uniqueExpiryDates.sort());
//             setError(null);
//         } catch (error) {
//             console.error('Error fetching expiry dates:', error);
//             setError('Failed to fetch expiry dates');
//         }
//     };

//     const filterDatesByYear = (year: string) => {
//         setSelectedYear(year);
//         setSelectedMonth('');
//     };

//     const filterDatesByMonth = (month: string) => {
//         setSelectedMonth(month);
//     };

//     // Extract unique years from expiry dates
//     const uniqueYears = Array.from(new Set(expiryDates.map(date => date.split('-')[2])));

//     // Extract unique months for the selected year
//     const uniqueMonths = selectedYear ? Array.from(new Set(expiryDates
//         .filter(date => date.endsWith(selectedYear))
//         .map(date => date.split('-')[1]))) : [];

//     return (
//         <div className='flex bg-slate-500'>
//             <form onSubmit={onSubmit}>
//                 <Label htmlFor="collectionName">Collection Name:</Label>
//                 <select id="collectionName" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}>
//                     <option value="">Select Collection</option>
//                     <option value="nifties">Nifties</option>
//                     <option value="banknifties">Bank Nifties</option>
//                 </select>
//                 <br />
//                 <Label htmlFor="instrument">Instrument:</Label>
//                 <select id="instrument" value={instrument} onChange={(e) => setInstrument(e.target.value)}>
//                     <option value="">Select Instrument</option>
//                     <option value="FUTIDX">Futures Index</option>
//                     <option value="OPTIDX">Options Index</option>
//                 </select>
//                 <br />
//                 <Button type="submit" variant={'ghost'}>Submit</Button>
//             </form>

//             {error && <p>{error}</p>}

//             {expiryDates.length > 0 && (
//                 <div className='flex flex-col'>
//                     <div className='bg-green-400'>
//                         <Label htmlFor="year">Year:</Label>
//                         <select value={selectedYear} onChange={(e) => filterDatesByYear(e.target.value)}>
//                             <option value="">Select Year</option>
//                             {uniqueYears.map((year, index) => (
//                                 <option key={index} value={year}>{year}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         {selectedYear && (
//                             <div className='flex bg-fuchsia-400'>
//                                 <div>
//                                     <Label htmlFor="month">Month:</Label>
//                                     <select value={selectedMonth} onChange={(e) => filterDatesByMonth(e.target.value)}>
//                                         <option value="">Select Month</option>
//                                         {uniqueMonths.map((month, index) => (
//                                             <option key={index} value={month}>{month}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div>
//                         {selectedMonth && (
//                             <div>
//                                 <h2>Expiry Dates</h2>
//                                 <ul>
//                                     {expiryDates
//                                         .filter(date => date.endsWith(selectedYear) && date.includes(selectedMonth))
//                                         .map((date, index) => (
//                                             <li key={index}>{date}</li>
//                                         ))}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CEForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { Button } from '../ui/button';
// import { Label } from '../ui/label';

// interface MatchingOption {
//     _id: {
//         $oid: string;
//     };
//     INSTRUMENT: string;
//     SYMBOL: string;
//     EXPIRY_DT: string;
//     STRIKE_PR: string;
//     OPTION_TYP: string;
//     OPEN: string;
//     HIGH: string;
//     LOW: string;
//     CLOSE: string;
//     SETTLE_PR: string;
//     CONTRACTS: string;
//     VAL_INLAKH: string;
//     OPEN_INT: string;
//     CHG_IN_OI: string;
//     TIMESTAMP: string;
//     __v: number;
// }

// const CEForm: React.FC = () => {
//     const [collectionName, setCollectionName] = useState<string>('');
//     const [instrument, setInstrument] = useState<string>('');
//     const [expiryDates, setExpiryDates] = useState<string[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedYear, setSelectedYear] = useState<string>('');
//     const [selectedMonth, setSelectedMonth] = useState<string>('');
//     const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>('');
//     const [matchingOptions, setMatchingOptions] = useState<MatchingOption[]>([]);

//     const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//         event.preventDefault();
//         try {
//             const response = await axios.get<{ expiryDates: string[] }>('/api/expiryDates', {
//                 params: {
//                     collectionName,
//                     instrument
//                 }
//             });
//             const uniqueExpiryDates = Array.from(new Set(response.data.expiryDates));
//             setExpiryDates(uniqueExpiryDates.sort());
//             setError(null);
//         } catch (error) {
//             console.error('Error fetching expiry dates:', error);
//             setError('Failed to fetch expiry dates');
//         }
//     };

//     const filterDatesByYear = (year: string) => {
//         setSelectedYear(year);
//         setSelectedMonth('');
//         setSelectedExpiryDate('');
//     };

//     const filterDatesByMonth = (month: string) => {
//         setSelectedMonth(month);
//         setSelectedExpiryDate('');
//     };

//     const handleExpiryDateChange = async (expiryDate: string) => {
//         setSelectedExpiryDate(expiryDate);
//         try {
//             const response = await axios.get<MatchingOption[]>(`/api/expiryCE?expiry=${expiryDate}&optionType=CE&instrument=${instrument}&collectionName=${collectionName}`);
//             setMatchingOptions(response.data);
//             setError(null);
//         } catch (error) {
//             console.error('Error fetching matching options:', error);
//             setError('Failed to fetch matching options');
//         }
//     };

//     // Extract unique years from expiry dates
//     const uniqueYears = Array.from(new Set(expiryDates.map(date => date.split('-')[2])));

//     // Extract unique months for the selected year
//     const uniqueMonths = selectedYear ? Array.from(new Set(expiryDates
//         .filter(date => date.endsWith(selectedYear))
//         .map(date => date.split('-')[1]))) : [];

//     return (
//         <div className='flex bg-slate-500'>
//             <form onSubmit={onSubmit}>
//                 <Label htmlFor="collectionName">Collection Name:</Label>
//                 <select id="collectionName" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}>
//                     <option value="">Select Collection</option>
//                     <option value="nifties">Nifties</option>
//                     <option value="banknifties">Bank Nifties</option>
//                 </select>
//                 <br />
//                 <Label htmlFor="instrument">Instrument:</Label>
//                 <select id="instrument" value={instrument} onChange={(e) => setInstrument(e.target.value)}>
//                     <option value="">Select Instrument</option>
//                     <option value="FUTIDX">Futures Index</option>
//                     <option value="OPTIDX">Options Index</option>
//                 </select>
//                 <br />
//                 <Button type="submit" variant={'ghost'}>Submit</Button>
//             </form>

//             {error && <p>{error}</p>}

//             {expiryDates.length > 0 && (
//                 <div className='flex flex-col'>
//                     <div className='bg-green-400'>
//                         <Label htmlFor="year">Year:</Label>
//                         <select value={selectedYear} onChange={(e) => filterDatesByYear(e.target.value)}>
//                             <option value="">Select Year</option>
//                             {uniqueYears.map((year, index) => (
//                                 <option key={index} value={year}>{year}</option>
//                             ))}
//                         </select>
//                     </div>

//                     <div>
//                         {selectedYear && (
//                             <div className='flex bg-fuchsia-400'>
//                                 <div>
//                                     <Label htmlFor="month">Month:</Label>
//                                     <select value={selectedMonth} onChange={(e) => filterDatesByMonth(e.target.value)}>
//                                         <option value="">Select Month</option>
//                                         {uniqueMonths.map((month, index) => (
//                                             <option key={index} value={month}>{month}</option>
//                                         ))}
//                                     </select>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div>
//                         {selectedMonth && (
//                             <div className='bg-yellow-300'>
//                                 <form>
//                                     <Label htmlFor="expiryDate">Expiry Date:</Label>
//                                     <select value={selectedExpiryDate} onChange={(e) => handleExpiryDateChange(e.target.value)}>
//                                         <option value="">Select Expiry Date</option>
//                                         {expiryDates
//                                             .filter(date => date.endsWith(selectedYear) && date.includes(selectedMonth))
//                                             .map((date, index) => (
//                                                 <option key={index} value={date}>{date}</option>
//                                             ))}
//                                     </select>
//                                 </form>
//                             </div>
//                         )}
//                     </div>

//                     <div>
//                         {selectedExpiryDate && matchingOptions.length > 0 && (
//                             <div>
//                                 <h2>Matching Options</h2>
//                                 <ul>
//                                     {matchingOptions.map((option, index) => (
//                                         <li key={index}>
//                                             <div>{option.SYMBOL}</div>
//                                             <div>{option.EXPIRY_DT}</div>
//                                             {/* Add other properties you want to display */}
//                                         </li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CEForm;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { createChart } from 'lightweight-charts';

interface MatchingOption {
    _id: {
        $oid: string;
    };
    INSTRUMENT: string;
    SYMBOL: string;
    EXPIRY_DT: string;
    STRIKE_PR: string;
    OPTION_TYP: string;
    OPEN: string;
    HIGH: string;
    LOW: string;
    CLOSE: string;
    SETTLE_PR: string;
    CONTRACTS: string;
    VAL_INLAKH: string;
    OPEN_INT: string;
    CHG_IN_OI: string;
    TIMESTAMP: string;
    __v: number;
}

const PEForm: React.FC = () => {
    const [collectionName, setCollectionName] = useState<string>('');
    const [instrument, setInstrument] = useState<string>('');
    const [expiryDates, setExpiryDates] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<string>('');
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [selectedExpiryDate, setSelectedExpiryDate] = useState<string>('');
    const [matchingOptions, setMatchingOptions] = useState<MatchingOption[]>([]);
    const [selectedStrikePrice, setSelectedStrikePrice] = useState<string>('');
    const [chart, setChart] = useState<any>(null);

    const createCandlestickChart = (data: MatchingOption[]) => {
        const chart = createChart(document.getElementById('chartpe') as HTMLElement, {
            width: 700,
            height: 400,
            layout: { textColor: 'black', background: { color: 'white' } }
        });

        chart.timeScale().fitContent();

        const candleSeries = chart.addCandlestickSeries();

        // Map data to candlestick format
        const mappedData = data.map(item => ({
            time: new Date(item.TIMESTAMP).toISOString().split('T')[0], // Convert time to ISO string format
            open: parseFloat(item.OPEN),
            high: parseFloat(item.HIGH),
            low: parseFloat(item.LOW),
            close: parseFloat(item.CLOSE),
        }));

        // Add data to the candlestick series
        candleSeries.setData(mappedData);

        setChart(chart);
    };


    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await axios.get<{ expiryDates: string[] }>('/api/expiryDates', {
                params: {
                    collectionName,
                    instrument
                }
            });
            const uniqueExpiryDates = Array.from(new Set(response.data.expiryDates));
            setExpiryDates(uniqueExpiryDates.sort());
            setError(null);
        } catch (error) {
            console.error('Error fetching expiry dates:', error);
            setError('Failed to fetch expiry dates');
        }
    };

    const filterDatesByYear = (year: string) => {
        setSelectedYear(year);
        setSelectedMonth('');
        setSelectedExpiryDate('');
    };

    const filterDatesByMonth = (month: string) => {
        setSelectedMonth(month);
        setSelectedExpiryDate('');
    };

    const handleExpiryDateChange = async (expiryDate: string) => {
        setSelectedExpiryDate(expiryDate);
        try {
            const response = await axios.get<MatchingOption[]>(`/api/expiryCE?expiry=${expiryDate}&optionType=PE&instrument=${instrument}&collectionName=${collectionName}`);
            setMatchingOptions(response.data);
            setError(null);
        } catch (error) {
            console.error('Error fetching matching options:', error);
            setError('Failed to fetch matching options');
        }
    };

    const handleStrikePriceChange = (strikePrice: string) => {
        setSelectedStrikePrice(strikePrice);
    };

    const filterByStrikePriceAndExpiry = (
        data: MatchingOption[],
        strikePrice: string,
        expiryDate: string
    ): MatchingOption[] => {
        return data.filter(item => item.STRIKE_PR === strikePrice && item.EXPIRY_DT === expiryDate);
    };

    // Filter matching options by strike price and expiry date
    const filteredOptions = filterByStrikePriceAndExpiry(matchingOptions, selectedStrikePrice, selectedExpiryDate);
    console.log(filteredOptions)

    // Extract unique years from expiry dates
    const uniqueYears = Array.from(new Set(expiryDates.map(date => date.split('-')[2])));

    // Extract unique months for the selected year
    const uniqueMonths = selectedYear ? Array.from(new Set(expiryDates
        .filter(date => date.endsWith(selectedYear))
        .map(date => date.split('-')[1]))) : [];

    // Extract unique strike prices from matching options
    const uniqueStrikePrices = Array.from(new Set(matchingOptions.map(option => option.STRIKE_PR)));

    useEffect(() => {
        if (chart) {
            chart.remove();
        }
        if (filteredOptions.length > 0) {
            createCandlestickChart(filteredOptions);
        }
    }, [selectedStrikePrice]);


    return (
        <div className='flex flex-col'>
            <div className='flex bg-indigo-300'>
                <form onSubmit={onSubmit}>
                    <Label htmlFor="collectionName">Collection Name:</Label>
                    <select id="collectionName" value={collectionName} onChange={(e) => setCollectionName(e.target.value)}>
                        <option value="">Select Collection</option>
                        <option value="nifties">Nifties</option>
                        <option value="banknifties">Bank Nifties</option>
                    </select>
                    <br />
                    <Label htmlFor="instrument">Instrument:</Label>
                    <select id="instrument" value={instrument} onChange={(e) => setInstrument(e.target.value)}>
                        <option value="">Select Instrument</option>
                        <option value="FUTIDX">Futures Index</option>
                        <option value="OPTIDX">Options Index</option>
                    </select>
                    <br />
                    <Button type="submit" variant={'ghost'}>Submit</Button>
                </form>

                {error && <p>{error}</p>}

                {expiryDates.length > 0 && (
                    <div className='flex flex-col'>
                        <div className='bg-green-400'>
                            <Label htmlFor="year">Year:</Label>
                            <select value={selectedYear} onChange={(e) => filterDatesByYear(e.target.value)}>
                                <option value="">Select Year</option>
                                {uniqueYears.map((year, index) => (
                                    <option key={index} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            {selectedYear && (
                                <div className='flex bg-fuchsia-400'>
                                    <div>
                                        <Label htmlFor="month">Month:</Label>
                                        <select value={selectedMonth} onChange={(e) => filterDatesByMonth(e.target.value)}>
                                            <option value="">Select Month</option>
                                            {uniqueMonths.map((month, index) => (
                                                <option key={index} value={month}>{month}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div>
                            {selectedMonth && (
                                <div className='bg-yellow-300'>
                                    <form>
                                        <Label htmlFor="expiryDate">Expiry Date:</Label>
                                        <select value={selectedExpiryDate} onChange={(e) => handleExpiryDateChange(e.target.value)}>
                                            <option value="">Select Expiry Date</option>
                                            {expiryDates
                                                .filter(date => date.endsWith(selectedYear) && date.includes(selectedMonth))
                                                .map((date, index) => (
                                                    <option key={index} value={date}>{date}</option>
                                                ))}
                                        </select>
                                    </form>
                                </div>
                            )}
                        </div>

                        <div>
                            {selectedExpiryDate && matchingOptions.length > 0 && (
                                <div>
                                    <Label htmlFor="strikePrice">Strike Price:</Label>
                                    <select id="strikePrice" value={selectedStrikePrice} onChange={(e) => handleStrikePriceChange(e.target.value)}>
                                        <option value="">Select Strike Price</option>
                                        {matchingOptions
                                            .map(option => option.STRIKE_PR) // Extract strike prices
                                            .filter((value, index, self) => self.indexOf(value) === index) // Remove duplicates
                                            .sort((a, b) => parseFloat(a) - parseFloat(b)) // Sort the strike prices
                                            .map((strikePrice, index) => (
                                                <option key={index} value={strikePrice}>{strikePrice}</option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div id="chartpe" />
        </div>
    );
};

export default PEForm;