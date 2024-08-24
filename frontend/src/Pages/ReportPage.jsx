import React from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AssessmentIcon from '@mui/icons-material/Assessment';

const ReportPage = () => {

    const downloadSalesReport = async () => {
        try {
            const response = await axios.get('http://localhost:9000/salesReport');
            const salesReport = response.data;
            const columns = ["Invoice ID", "Items", "Total", "Date"];
            const rows = salesReport.map(sale => [
                sale._id,
                sale.quantities.map((qty, index) => `${qty} ${sale.items[index]}`).join(', '),
                sale.total,
                sale.createdAt.split('T')[0] + ' ' + sale.createdAt.split('T')[1].split('Z')[0]
            ]);
            const date = new Date().toLocaleDateString();
            const title = `Itech Systems Sales Report Generated on ${date}`;

            const doc = new jsPDF();
            doc.setFontSize(14);
            doc.text(title, 20, 20);
            doc.autoTable({
                startY: 30,
                head: [columns],
                body: rows,
            });
            doc.save(`${date}-SalesReport.pdf`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h1 className="lg:text-8xl sm:text-4xl text-white font-bold text-center my-4">All Reports</h1>

            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">

                    <button
                        className="w-full lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl
                         md:text-4xl lg:text-5xl text-white bg-gradient-to-r from-blue-500 to-green-500
                          rounded-lg hover:from-blue-600 hover:to-green-600"
                        onClick={downloadSalesReport}
                    >
                        Download Sales Report <AssessmentIcon className="" />
                    </button>
                </div>
            </div >
        </>
    );
}

export default ReportPage;
