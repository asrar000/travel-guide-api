const router = require("express").Router();
const { search } = require("../controllers/searchController");

router.get("/:locationname", search);

module.exports = router;
