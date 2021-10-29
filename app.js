require("dotenv").config();
require("express-async-errors");
const express = require("express");
const notFound = require("./middlewares/notFound");
const dishRoute = require("./routes/dishes");
const errorHandleMiddleware = require("./middlewares/errorMiddleWare");
const connectDB = require("./db/connectDB");
const fileUpload = require("express-fileupload");

// CLOUDINARY
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const app = express();

// Middlewares
app.use(express.static("./public"));

app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));

// routes
app.get("/", (req, res) => {
  res.send(
    '<h1>African dishes API</h1><a href="/api/v1/dishes">Dishes route</a>'
  );
});

// Dishes Routes
app.use("/api/v1/dishes", dishRoute);

// Error Middlewares
app.use(notFound);
app.use(errorHandleMiddleware);

const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    //   DB connect here
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server Listening on port: ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
