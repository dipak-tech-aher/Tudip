const dotenv = require('dotenv');
const connectWithDb = require("./config/db");
// connect with databases
connectWithDb();
process.on('uncaughtException', err => {
  console.log('uncaughtException', err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on('unhandledRejection', err => {
  console.log('unhandledRejection', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
