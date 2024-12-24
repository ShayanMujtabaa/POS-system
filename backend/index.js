const express = require('express');
const cors = require('cors');

// Load environment variables
require('./config/envVariables');

// Import DB connection
const connectDB = require('./config/databaseConnection');

// Import Routes
const POSroutes = require('./routes/POSroutes');
const ItemRoutes = require('./routes/ItemRoutes');

const app = express();
const PORT = process.env.PORT || 9000;

// Middleware
app.use(cors());
app.use(express.json());

// Route setup
app.use('/api', ItemRoutes);

// Connect to DB and start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

app.get('/', POSroutes.GetTest);
app.post('/addItem', POSroutes.AddItem);
app.post('/getItems', POSroutes.GetItems);
app.post('/deleteItem', POSroutes.DeleteItem);
app.post('/updateItem', POSroutes.UpdateItem);
app.post('/updateStock', POSroutes.UpdateStock);
app.post('/checkout', POSroutes.Checkout);
app.post('/refund', POSroutes.Refund);
app.get('/salesReport', POSroutes.SalesReport);
app.get('/itemReport', POSroutes.ItemReport);
app.get('/categoryReport', POSroutes.CategoryReport);
app.post('/addCategory', POSroutes.AddCategory);
app.post('/getCategories', POSroutes.GetCategories); 
app.post('/deleteCategory', POSroutes.DeleteCategory);
app.post('/addExpense', POSroutes.AddExpense);
app.post('/holdCart', POSroutes.HoldCart);
app.get('/getHeldCarts', POSroutes.GetHeldCarts);
app.post('/deleteHeldCart', POSroutes.DeleteHeldCart);



