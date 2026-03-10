import { createLogger, format, transports } from "winston";

const { combine, timestamp, printf, colorize, errors } = format;

// Custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Create logger
const logger = createLogger({
  level: "info", // default log level
  format: combine(
    colorize(),        // colorize logs in console
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // capture error stack trace
    logFormat
  ),
  transports: [
    new transports.Console(), // logs to console
    new transports.File({ filename: "logs/error.log", level: "error" }), // errors only
    new transports.File({ filename: "logs/combined.log" }) // all logs
  ],
  exitOnError: false, // don't exit on handled exceptions
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
      new transports.Console({
        format: combine(colorize(), timestamp(), logFormat),
      })
    );
  }

export default logger;