/******************************************
 * Primary server.js file of the application.
 * Controls the project startup and configuration.
 ******************************************/

/* ***********************
 * Require Statements
 *************************/
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const flash = require("connect-flash");
const baseController = require("./controllers/baseController");
const inventoryRoute = require("./routes/inventoryRoute");
const static = require("./routes/static");
const utilities = require("./utilities/");

/* ***********************
 * Create Express App
 *************************/
const app = express();

/* ***********************
 * View Engine and Template Settings
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // Not at views root

/* ***********************
 * Middleware: Body Parsers
 *************************/
app.use(express.json()); // Parses incoming requests with JSON
app.use(express.urlencoded({ extended: true })); // Parses form data

/* ***********************
 * Routes
 *************************/
app.use(static); // Static file routes (e.g., CSS, JS)
app.use("/inv", inventoryRoute); // Inventory-related routes
app.get("/", baseController.buildHome); // Home route

/* ***********************
 * Error Handling Middleware
 *************************/

// Global Error Handler
app.use(async function (err, req, res, next) {
  console.error("Global Error Handler:", err.stack);
  const nav = await utilities.getNav();
  res.status(500).render("error", {
    title: "Server Error",
    message: err.message,
    nav,
  });
});

// 404 Not Found Handler
app.use(async (req, res, next) => {
  const nav = await utilities.getNav();
  res.status(404).render("error", {
    title: "404",
    message: "Sorry, we appear to have lost that page.",
    nav,
  });
});
app.use(async (req, res, next) => {
  res.locals.nav = await Util.getNav();
  next();
});

/* ***********************
 * Local Server Info from .env
 *************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Start Server
 *************************/
app.listen(port, () => {
  console.log(`App listening on ${host}:${port}`);
});
