require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const productRoute = require("./routes/product-route");
const orderRoute = require("./routes/order-route");

const errorHandler = require("./middlewares/error");
const notFoundHandler = require("./middlewares/not-found");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/order", orderRoute);


// Error Handler
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PROJECT_PORT || 8888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
