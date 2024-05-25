const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const POSroutes = require('./routes/POSroutes');


//for running locally: (comment out for deployment)
dotenv.config({
    path: './.env.local',
});


const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', POSroutes.GetTest);
app.post('/addItem', POSroutes.AddItem);
app.get('/getItems', POSroutes.GetItems);
app.post('/deleteItem', POSroutes.DeleteItem);
app.post('/updateItem', POSroutes.UpdateItem);


