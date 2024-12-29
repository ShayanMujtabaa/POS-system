const path = require("path");
const winston = require("winston");
const { combine, timestamp, json, prettyPrint, errors } = winston.format;

// Define static log directory
const logDirectory = path.resolve(__dirname, "../Logs");

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), json(), prettyPrint()),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, "InfoLogs.log"),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "AllLogs.log"),
    }),
  ],
});

const ErrorLogger = winston.createLogger({
  level: "error",
  format: combine(timestamp(), json(), prettyPrint(), errors({ stack: true })),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(logDirectory, "ErrorLogs.log"),
    }),
    new winston.transports.File({
      filename: path.join(logDirectory, "AllLogs.log"),
    }),
  ],
});

module.exports = { logger, ErrorLogger };
