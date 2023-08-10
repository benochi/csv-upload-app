const fs = require('fs');

const fileLoggerMiddleware = (req, res, next) => {
  const { file, headers } = req;
  let logMessage = '';
  if (file) {
    logMessage += `Uploaded File: ${file.originalname}\n`;
  }
  logMessage += `Headers: ${JSON.stringify(headers)}\n`;
  logMessage += `Requester IP Address: ${req.ip}\n`;
  logMessage += `Request Method: ${req.method}\n`;
  logMessage += `Request URL: ${req.originalUrl}\n`;

  fs.appendFile('uploaded_files.txt', logMessage + '\n', (error) => {
    if (error) {
      console.error('Error writing to file log:', error);
    }
  });

  next();
};

module.exports = fileLoggerMiddleware;
