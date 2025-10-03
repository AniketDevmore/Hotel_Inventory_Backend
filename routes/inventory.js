const express = require('express');
const router = express.Router();
const { getCategoryList, getInventoryUnitList, addInventory, updateInventory, editInventory, deleteInventory, getInventoryList } = require("../controller/inventoryController")

router.get('/product_category', getCategoryList);
router.get('/inventory_unit', getInventoryUnitList);
router.post('/add_inventory', addInventory);
router.post('/inventory_usage', updateInventory);
router.post('/inventory_update', editInventory);
router.delete('/delete_inventory', deleteInventory);
router.post('/get_inventory', getInventoryList);

module.exports = router