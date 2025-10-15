// Needed Resources
const express = require("express");
const router = new express.Router();
const invController = require("../controllers/invController");
router.get("/type/:classificationId", invController.buildByClassificationId);
router.get("/detail/:inv_id", invController.buildDetailView);
router.get("/error-test", invController.triggerError);
module.exports = router;
