require("dotenv").config();
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth-route");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRoutes);


const port = process.env.PROJECT_PORT || 8888;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
