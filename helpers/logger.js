const { createLogger, format, transports } = require('winston');
const path = require('path');
const fs = require('fs');

// Path to logs folder
const logDir = path.join(__dirname, '..', 'logs');

// Recreate logs folder before each run
if (fs.existsSync(logDir)) {
  fs.rmSync(logDir, { recursive: true, force: true });
}
fs.mkdirSync(logDir);

// Generate single timestamp for the run
const runTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
const logFileName = path.join(logDir, `test-run-${runTimestamp}.log`);

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}]: ${info.message}`)
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: logFileName }) // single log file for this run
  ]
});

module.exports = logger;