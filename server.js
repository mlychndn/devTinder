const app = require("./app");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

// database connection

const connectionStr = process.env.MONGODB_URI;

(async () => {
  try {
    await mongoose.connect(connectionStr);
    console.log("Database connected");
  } catch (err) {
    console.error(err.message);
  }
})();

// listening to the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
