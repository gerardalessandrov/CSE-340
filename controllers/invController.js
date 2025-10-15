const invModel = require("../models/inventory-model");
const utilities = require("../utilities/");

const invCont = {};

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  const grid = await utilities.buildClassificationGrid(data);
  let nav = await utilities.getNav();
  const className = data[0].classification_name;
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};
invCont.buildDetailView = async function (req, res, next) {
  const invId = req.params.inv_id; // Obtiene el ID de la URL

  try {
    const vehicleData = await invModel.getVehicleById(invId); // Busca en DB
    if (!vehicleData) {
      return res.status(404).send("Vehículo no encontrado.");
    }

    const detailHtml = await utilities.buildVehicleDetailHtml(vehicleData); // Envuelve en HTML
    const nav = await utilities.getNav();
    res.render("inventory/detail", {
      title: `${vehicleData.inv_make} ${vehicleData.inv_model}`,
      nav,
      detailHtml, // Enviamos HTML ya listo
    });
  } catch (error) {
    next(error);
  }
};
// En invController.js o baseController.js
invCont.triggerError = async function (req, res, next) {
  try {
    throw new Error("Oh no! There was a crash. Maybe try a different route");
  } catch (err) {
    next(err);
  }
};

// En tu archivo de rutas:

module.exports = invCont;
