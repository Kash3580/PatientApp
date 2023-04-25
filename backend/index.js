const http = require('http');
const app = require('./app');
const logger = require('./config/logger');
const server = http.createServer(app);

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

// server listening
server.listen(port, () => {
  logger.info(`Server Listening On Port ${port}`);
});
