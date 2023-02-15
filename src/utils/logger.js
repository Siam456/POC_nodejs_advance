import winston from "winston";
require("winston-mongodb");
import expressWinston from "express-winston";
import "winston-daily-rotate-file";
import fs from "fs";

const logDir = __dirname + "/../logs";

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const getMessage = (req, res) => {
  let obj = {
    correlationId: req.headers["x-correlation-id"],
    requestBody: req.body,
  };

  return JSON.stringify(obj);
};

const mongoErrorTransport = (uri) =>
  new winston.transports.MongoDB({
    db: uri,
    metaKey: "meta",
    options: { useUnifiedTopology: true },
  });

export const infoLogger = () =>
  expressWinston.logger({
    transports: [
      new winston.transports.Console(),
      new winston.transports.DailyRotateFile({
        level: "debug",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/debug", // log file /logs/debug/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        json: false,
        zippedArchive: true,
      }),
    ],
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.json()
    ),
    dirname: logDir + "/debug",
    meta: false,
    msg: getMessage,
  });

export const errorLogger = (uri) =>
  expressWinston.errorLogger({
    transports: [
      new winston.transports.Console(),
      // error log setting
      new winston.transports.DailyRotateFile({
        level: "error",
        datePattern: "YYYY-MM-DD",
        dirname: logDir + "/error", // log file /logs/error/*.log in save
        filename: `%DATE%.log`,
        maxFiles: 30, // 30 Days saved
        handleExceptions: true,
        json: false,
        zippedArchive: true,
      }),
      mongoErrorTransport(uri),
    ],
    format: winston.format.combine(
      // winston.format.colorize(),
      winston.format.json()
    ),
    meta: true,
    msg: '{ "correlationId": "{{req.headers["x-correlation-id"]}}", "error": "{{err.message}}" }',
  });

export const stream = {
  write: (message) => {
    if (process.env.NODE_ENV !== "TEST")
      console.log(message.substring(0, message.lastIndexOf("\n")));
  },
};
