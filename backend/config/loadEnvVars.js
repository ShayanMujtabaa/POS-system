const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './config/.env.local' });



console.log("Environment variables loaded:", process.env.MONGO_URI); // Debuggin
