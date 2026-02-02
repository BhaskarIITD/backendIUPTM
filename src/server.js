import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors'

const app = express();
const PORT = process.env.PORT || 5000;

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);


app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
