const app = require("./app");

const dotenv = require('dotenv');
const connectDatabase = require("./config/database");
const error = require("./middleware/error");

// Handling Uncaught Exception
process.on("uncaughtException", (err)=> {
console.log(`Error: ${err.message}`);
console.log(`Shutting Down the Server due to Uncaught Exception`);
process.exit(1);
});


// Config
dotenv.config({path: "backend/config/config.env"});

//  Connecting to Database
connectDatabase()



const server = app.listen(process.env.PORT,  () =>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting Down the Server due to Unhandled Promise Rejection`);
    server.close(() => {
      process.exit(1);
    });
  });
  