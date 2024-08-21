const app = require("./app");
const dotenv = require("dotenv");
const { connectDb } = require("./config/dbConnect");

dotenv.config({ path: "./config/config.env" });
const port = process.env.PORT || 3000;

app.listen(port, async () => {
  connectDb()
  console.log("successfully running");
});
