import express from "express";

import { fileURLToPath } from "node:url";
import path, { dirname } from "node:path";

import dotenv from "dotenv";

import userRouter from "./Routes/usersRouter.js";

// Add Email (required), (DONE)
// Age (Optional)
// Bio (Optional, 200 chars)

// Load .env
dotenv.config();

// Define app
const PORT = process.env.PORT || 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Define root-paths
app.set("views", path.join(__dirname, "Views"));
// Add ejs engine
app.set("view engine", "ejs");

// Update express's capability for reading forms
app.use(express.urlencoded({ extended: true }));

app.use("/", userRouter);

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }

  console.log(`Server is running at port: ${PORT}`);
});
