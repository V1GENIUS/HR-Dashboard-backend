const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const userRoutes = require("./routes/userRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const leaveRoutes = require("./routes/leaveRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const db = require("./Database/db");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); 
db();

// Routes
app.use("/api/users", userRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/leaves", leaveRoutes);
app.use("/api/attendance", attendanceRoutes);


// 🔁 Proxy route to external APIs to avoid CORS
app.get("/api/proxy", async (req, res) => {
  const { url } = req.query;

  // Optional: Whitelist allowed base URLs for security
  const allowedDomains = ["https://jsonplaceholder.typicode.com", "https://api.publicapis.org"];
  const isAllowed = allowedDomains.some(domain => url?.startsWith(domain));

  if (!url || !isAllowed) {
    return res.status(400).json({ error: "URL not allowed or missing" });
  }inti

  try {
    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch from external API", detail: error.message });
  }
});

// Protected route
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route" });
});

// Start server
const PORT = process.env.PORT || 8900;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
