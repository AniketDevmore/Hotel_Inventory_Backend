const express = require('express');
const router = express.Router();
const { getCategoryList, getInventoryUnitList } = require("../controller/inventoryController")

router.get('/product_category', getCategoryList);
router.get('/inventory_unit', getInventoryUnitList);

module.exports = router