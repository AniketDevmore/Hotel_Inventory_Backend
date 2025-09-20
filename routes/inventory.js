const express = require('express');
const router = express.Router();
const { getCategoryList, getInventoryUnitList, addInventory, updateInventory } = require("../controller/inventoryController")

router.get('/product_category', getCategoryList);
router.get('/inventory_unit', getInventoryUnitList);
router.post('/add_inventory', addInventory);
router.post('/inventory_usage', updateInventory);

module.exports = router