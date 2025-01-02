import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from '@mui/material';

const ReportPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const downloadSalesReport = async () => {
        try {
            const response = await axios.get('http://localhost:9000/report/salesReport', {
                params: {
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString()
                }
            });
            const salesReport = response.data;
            const columns = ["Invoice ID", "Items", "Quantities", "Total", "Date", "Time"];
            const rows = salesReport.map(sale => {
                const saleDate = new Date(sale.createdAt)
                const formattedDate = saleDate.toLocaleDateString()
                const formattedTime = saleDate.toLocaleTimeString()
                return [
                    sale._id,
                    sale.items.join('\n'),
                    sale.quantities.join('\n'),
                    sale.total,
                    `${formattedDate}`,
                    `${formattedTime}`
                ]
            })
            const date = new Date().toLocaleDateString();
            const startDateStr = startDate ? startDate.toLocaleDateString() : 'All time';
            const endDateStr = endDate ? endDate.toLocaleDateString() : 'Present';
            const title = `Itech Systems Sales Report (${startDateStr} to ${endDateStr})`;
            const subtitle = `Generated on ${date}`;

            const doc = new jsPDF();
            doc.setFontSize(14);
            doc.text(title, 20, 20);
            doc.setFontSize(12);
            doc.text(subtitle, 20, 30);
            doc.autoTable({
                startY: 40,
                head: [columns],
                body: rows,
            });
            doc.save(`${date}-SalesReport.pdf`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="p-4">
                <h1 className="lg:text-8xl sm:text-4xl text-white font-bold text-center my-4">Sales Wise Report</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="grid grid-cols-1 gap-4 w-1/4 max-w-2xl mb-4 mt-8">
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            className="bg-white w-full"
                        />
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            className="bg-white w-full"
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={downloadSalesReport}
                        className="w-1/6 lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl
                         lg:text-5xl text-white bg-gradient-to-r from-blue-700 to-green-500 rounded-lg
                         hover:from-blue-600 hover:to-green-600"
                    >
                        Generate Sales Report <AssessmentIcon className="ml-2" />
                    </Button>
                </div>
            </div>
        </LocalizationProvider>
    );
}

export default ReportPage;