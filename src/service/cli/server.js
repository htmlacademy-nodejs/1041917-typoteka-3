'use strict';

const chalk = require('chalk');
const http = require('http');
const fs = require('fs').promises;
const {HttpCode} = require('../../constants');

const DEFAULT_PORT = 3000;
const FILE_NAME = 'mocks.json';

module.exports = {
  name: '--server',
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    http.createServer(onClientConnect)
      .listen(port)
      .on('listening', () => {
        console.info(chalk.green(`Server listening on port ${port}`));
      })
      .on('error', (error) => console.error(chalk.red(error)))
  }
}

const sendResponse = (respose, statusCode, message) => {
  const template = `
    <!Doctype html>
      <html lang="ru">
      <head>
        <title>With love from Node</title>
      </head>
      <body>${message}</body>
    </html>`;

  respose.writeHead(statusCode, {
    'Content-Type': `text/html; charset=UTF-8`
  });

  respose.end(template);
};

const onClientConnect = async (req, res) => {
  const notFoundErrorMessage = 'Not Found';

  switch (req.url) {
    case '/':
      try {
        const content = await fs.readFile(FILE_NAME);
        const data = JSON.parse(content);
        const titles = data.map(line => `<li>${line.title}</li>`).join('');
        sendResponse(res, HttpCode.OK, `<ul>${titles}</ul>`);
      } catch (err) {
        sendResponse(res, HttpCode.NOT_FOUND, notFoundErrorMessage);
      }
      break;
    default:
      sendResponse(res, HttpCode.NOT_FOUND, notFoundErrorMessage);
  }
};
