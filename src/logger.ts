import { Console } from 'console';
import fs from 'fs';

/**
 * Logger class to wrap the {@link console} and write to a file
 */
class Logger extends Console {
  log = (message: any) => {
    logFile.write(
      `${new Date().toISOString().substring(11, 19)} - [LOG] ${message}\n`
    );
  };
  info = (message: any) => {
    console.info(message);
    logFile.write(
      `${new Date().toISOString().substring(11, 19)} - [INFO] ${message}\n`
    );
  };
  warn = (message: any) => {
    logFile.write(
      `${new Date().toISOString().substring(11, 19)} - [WARN] ${message}\n`
    );
  };
  error = (message: any) => {
    logFile.write(
      `${new Date().toISOString().substring(11, 19)} - [ERROR] ${message}\n`
    );
  };
  debug = (message: any) => {
    console.debug(message);
    logFile.write(
      `${new Date().toISOString().substring(11, 19)} - [DEBUG] ${message}\n`
    );
  };
}

var logFile = fs.createWriteStream(
  `${new Date().toISOString().substring(0, 10)}.log`,
  {
    flags: 'a'
  }
);

export default Logger;
