const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const { passport } = require("./middlewares");
const session = require("express-session");

const { EXPRESS_SESSION_SECRET } = process.env;

const usersRouter = require("./routes/users");
const googleRouter = require("./routes/auth");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: EXPRESS_SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", googleRouter);
app.use("/api/auth", usersRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
