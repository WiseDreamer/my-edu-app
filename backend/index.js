const express = require("express");
const cors = require("cors");
const app = express();

// CORS Middleware should be the first thing applied
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}));

// Handle preflight OPTIONS requests for all routes
app.options('*', cors());

app.use(express.json()); // JSON parsing middleware AFTER CORS

// Routes
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

app.use("/user", userRoutes);
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
