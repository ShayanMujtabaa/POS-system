import React from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import InventoryIcon from '@mui/icons-material/Inventory';

const StockReportPage = () => {
  const generateStockReport = async () => {
    try {
      const response = await axios.get('http://localhost:9000/report/stockReport');
      const stockReport = response.data;
      
      console.log('Stock Report Data:', stockReport);

      const columns = ["Item ID", "Item Name", "Stock Available"];
      const rows = stockReport.map(item => [
        item.id,
        item.name,
        item.stock,
      ]);

      const date = new Date().toLocaleDateString();
      const title = `Itech Systems Stock Report (All Time)`;
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

      doc.save(`${date}-StockReport.pdf`);
    } catch (error) {
      console.error('Error generating stock report:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="lg:text-8xl sm:text-4xl text-white font-bold text-center my-4">
        Stock Report
      </h1>
      <div className="flex flex-col items-center justify-center mt-14">
        <Button
          variant="contained"
          onClick={generateStockReport}
          className="w-1/6 lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl
                     lg:text-5xl text-white bg-gradient-to-r from-blue-700 to-green-500 rounded-lg
                     hover:from-blue-600 hover:to-green-600 "
        >
          Generate Stock Report <InventoryIcon className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default StockReportPage;
