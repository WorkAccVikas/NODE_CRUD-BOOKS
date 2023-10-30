require("dotenv").config();

const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("express");
const app = express();
const morgan = require("morgan");

const mongoDBConnection = require("./src/utils/connection/connection");

const booksRoute = require("./src/routes/Books/Books");

// Established MongoDB connection
mongoDBConnection();

morgan.token("custom-time", () => {
  const date = new Date(new Date().getTime() + 5.5 * 60 * 60 * 1000);
  const formattedDate = date.toISOString().replace("T", " ").slice(0, -1);
  return formattedDate;
});

const customLoggingFormat =
  ":custom-time - :method :url :status :response-time ms";

// Middleware
app.use(morgan(customLoggingFormat));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to Books World"));

// Add Routes
app.use("/api/v1/books", booksRoute);

app.listen(PORT, () =>
  console.log(`\n🚀🚀🚀 Server started at 👉 http://localhost:${PORT} 🚀🚀🚀`)
);
