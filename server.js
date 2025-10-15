/* ******************************************
 * This server.js file is the primary file of the
 * application. It is used to control the project.
 *******************************************/
/* ***********************
 * Require Statements
 *************************/

const inventoryRoute = require("./routes/inventoryRoute");
const baseController = require("./controllers/baseController");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const env = require("dotenv").config();
const app = express();
const static = require("./routes/static");
const utilities = require("./utilities/");

/* ***********************
 * View Engine and Template
 *************************/
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // not at views root
/* ***********************
 * Routes
 *************************/
app.use(static);
/* ***********************
 * Local Server Information
 * Values from .env (environment) file
 ************************/
const port = process.env.PORT;
const host = process.env.HOST;

/* ***********************
 * Log statement to confirm server operation
 *************************/
app.listen(port, () => {
  console.log(`app listening on ${host}:${port}`);
});
//Index Route
// app.get("/",function(req,res){
//   res.render("index",{title:"Home"})
// })
// app.use(require("./routes/static"));
// app.get("/", utilities.handleErrors(baseController.buildHome));
app.get("/", baseController.buildHome);
app.use("/inv", inventoryRoute);
// Error handling middleware
app.use(async function (err, req, res, next) {
  console.error("Global Error Handler:", err.stack);
  const nav = await utilities.getNav();
  res.status(500).render("error", {
    title: "Server Error",
    message: err.message,
    nav,
  });
});
// Captura errores 404 (ruta no encontrada)
app.use(async (req, res, next) => {
  let nav = await utilities.getNav();
  res.status(404).render("error", {
    title: "404",
    message: "Sorry,we appear to have lost that page.",
    nav,
  });
});
