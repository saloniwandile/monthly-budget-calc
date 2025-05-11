const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Helper function to generate file name and sheet name
function getFileNameAndSheetName(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "long" });
  const fileName = `${year}.xlsx`;
  return { fileName, sheetName: month };
}

// Endpoint to download the file
app.get("/download/:year", (req, res) => {
  const year = req.params.year;
  const filePath = `./data/${year}.xlsx`;

  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: "File not found" });
  }
});

// Endpoint to add items to the cart and save to Excel
// Endpoint to add items to the cart and save to Excel
app.post("/add-items", (req, res) => {
    try {
      const items = req.body.cartItems; // Expecting an array of cart items in the request body
      if (!items || items.length === 0) {
        return res.status(400).json({ message: "No items provided." });
      }
  
      items.forEach(item => {
        if (!item.name || !item.price || !item.date) {
          return res.status(400).json({ message: "Missing required fields in an item." });
        }
  
        const { fileName, sheetName } = getFileNameAndSheetName(item.date);
        const filePath = path.join(__dirname, 'data', fileName);
  
        let workbook;
  
        // Check if file already exists, if not, create it
        if (fs.existsSync(filePath)) {
          workbook = XLSX.readFile(filePath);
        } else {
          workbook = XLSX.utils.book_new();
        }
  
        let sheetData = [];
        if (workbook.SheetNames.includes(sheetName)) {
          const existingSheet = workbook.Sheets[sheetName];
          sheetData = XLSX.utils.sheet_to_json(existingSheet);
        }
  
        // Ensure the data is properly formatted before adding it
        const formattedItem = {
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1, // Default to 1 if quantity not provided
          date: item.date,
        };
  
        // Append the new item to the sheet data
        sheetData.push(formattedItem);
        const newSheet = XLSX.utils.json_to_sheet(sheetData);
  
        // Remove the old sheet and re-append the updated one
        if (workbook.SheetNames.includes(sheetName)) {
          workbook.SheetNames = workbook.SheetNames.filter(name => name !== sheetName);
        }
  
        XLSX.utils.book_append_sheet(workbook, newSheet, sheetName);
        XLSX.writeFile(workbook, filePath);
      });
  
      return res.status(200).json({ message: "Items added successfully to the Excel sheet." });
    } catch (error) {
      console.error("Error while adding items to Excel:", error);
      return res.status(500).json({ message: "An error occurred while processing your request.", error: error.message });
    }
  });
  
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
