import React, { useState } from 'react';
import axios from 'axios';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AssessmentIcon from '@mui/icons-material/Assessment';

const CategoryReportPage = () => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const generateCategoryReport = async () => {
        try {
            const response = await axios.get('http://localhost:9000/report/categoryReport', {
                params: {
                    startDate: startDate?.toISOString(),
                    endDate: endDate?.toISOString()
                }
            });
            const categoryReport = response.data;

            console.log('Category Report Data:', categoryReport);


            const columns = ["Category Name", "Quantity Sold", "Total Sales"];
            const rows = categoryReport.map(category => [
                category.name,
                category.totalQuantity,
                `$${category.totalSales.toFixed(2)}`
            ]);

            const startDateStr = startDate ? startDate.toLocaleDateString() : 'All time';
            const endDateStr = endDate ? endDate.toLocaleDateString() : 'Present';
            const date = new Date().toLocaleDateString();
            const title = `Itech Systems Category Sales Report (${startDateStr} to ${endDateStr})`;
            const subtitle = `Generated on ${date}`;

            const doc = new jsPDF();
            doc.setFontSize(16);
            doc.text(title, 14, 20);
            doc.setFontSize(12);
            doc.text(subtitle, 14, 30);

            doc.autoTable({
                startY: 40,
                head: [columns],
                body: rows,
            });

            doc.save(`${date}-CategorySalesReport.pdf`);
        } catch (error) {
            console.error('Error generating category report:', error);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <div className="p-4">
                <h1 className="lg:text-8xl sm:text-4xl text-white font-bold text-center my-4">Category Wise Report</h1>
                <div className="flex flex-col items-center justify-center">
                    <div className="grid grid-cols-1 gap-4 w-1/4 max-w-2xl mb-4 mt-8">
                        <DatePicker
                            label="Start Date"
                            value={startDate}
                            onChange={(newValue) => setStartDate(newValue)}
                            className="bg-white"
                        />
                        <DatePicker
                            label="End Date"
                            value={endDate}
                            onChange={(newValue) => setEndDate(newValue)}
                            className="bg-white"
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={generateCategoryReport}
                        className="w-1/6 lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl
                         lg:text-5xl text-white bg-gradient-to-r from-blue-700 to-green-500 rounded-lg
                         hover:from-blue-600 hover:to-green-600"
                    >
                        Generate Category Report <AssessmentIcon className="ml-2" />
                    </Button>
                </div>
            </div>
        </LocalizationProvider>
    );
};

export default CategoryReportPage;