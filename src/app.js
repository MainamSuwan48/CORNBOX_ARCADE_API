require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth-route");

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/not-found");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);

// Error Handler
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PROJECT_PORT || 8888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
