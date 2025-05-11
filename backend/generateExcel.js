const XLSX = require('xlsx');
const fs = require('fs');

// Create an empty workbook
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet([[]]); // Empty sheet
XLSX.utils.book_append_sheet(wb, ws, 'January'); // Create sheet for January

// Save the file
const filePath = './data/2025.xlsx';
XLSX.writeFile(wb, filePath);
console.log('2025.xlsx file created!');