const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const { authRouter } = require("./routes/api/authRouter");
const { usersRouter } = require("./routes/api/usersRouter");
const { healthzCheckRouter } = require("./routes/api/healthzCheckRouter");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8080;

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.use(logger(formatsLogger));
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/healthz", healthzCheckRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);

// error handler
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.listen(port, () => {
  console.log(`This app listening on port ${port}!`);
});

module.exports = app;
