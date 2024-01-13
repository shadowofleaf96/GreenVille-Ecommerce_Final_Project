const app = require("./app");
require('dotenv').config({ path: '../.env' });
const database = require('../server/config/database');


const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on ${process.env.VITE_API_URL}`);
});