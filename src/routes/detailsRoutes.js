const router = require("express").Router();
const { details } = require("../controllers/detailsController");

router.get("/:id", details);

module.exports = router;
