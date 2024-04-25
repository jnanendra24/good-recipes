const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config()
const app = express();

//middleware
app.use(express.json({ limit: "50mb"}));
app.use(cors());


//routes
app.use("/auth", authRoutes);

app.use("/recipe", recipeRoutes);
//DB config
mongoose.connect(process.env.DB_CONNECTION_URI).then(() => {
  console.log("DB connected");
  app.listen(5000, () => {
    console.log("Server running on port 5000");
  });
});

//export express app to use by vercel
module.exports = app;