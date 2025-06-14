require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const personRoutes = require("./Routes/personRoutes");
const playerRoutes=require("./Routes/playerRoutes");
const teamRoutes=require("./Routes/teamRoutes");
const auctionRoutes=require("./Routes/auctionRoutes");
const dashboardRoutes=require("./Routes/dasboardRoutes");
const biddingRoutes=require("./Routes/biddingRoutes");
const cors = require("cors");
const compression = require("compression");
const path = require("path");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(
    "mongodb+srv://dasabhi1910:iamf00L@cricket-bidding.dugejrq.mongodb.net/",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDB connected successfully."))
  .catch((err) => console.error("MongoDB connection error:", err));

const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not Allowed By Cors"));
      }
    },
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", personRoutes);
app.use("/", playerRoutes);
app.use("/",teamRoutes);
app.use("/",auctionRoutes);
app.use("/",dashboardRoutes);
app.use("/",biddingRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});