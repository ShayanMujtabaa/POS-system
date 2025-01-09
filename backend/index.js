const express = require("express");
const cors = require("cors");

// Load environment variables
require("./config/loadEnvVars");

// Import DB connection
const connectDB = require("./config/databaseConnection");

// Import Routes
const ItemRoutes = require("./routes/ItemRoutes");
const CategoryRoutes = require("./routes/CategoryRoutes");
const SalesRoutes = require("./routes/SalesRoutes");
const ExpenseRoutes = require("./routes/ExpenseRoutes");
const ReportsRoutes = require("./routes/ReportsRoutes");
const UserRoutes = require("./routes/UserRoutes")

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true,
  })
);
app.use(express.json());

// Route setup
app.use("/item", ItemRoutes);
app.use("/category", CategoryRoutes);
app.use("/sale", SalesRoutes);
app.use("/expense", ExpenseRoutes);
app.use("/report", ReportsRoutes);
app.use("/user", UserRoutes);

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// app.get('/stockReport', POSroutes.StockReport);




