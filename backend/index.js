const express = require('express');
const cors = require('cors');

// Load environment variables
require('./config/loadEnvVars');

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
app.post('/holdCart', POSroutes.HoldCart);
app.get('/getHeldCarts', POSroutes.GetHeldCarts);
app.post('/deleteHeldCart', POSroutes.DeleteHeldCart);



