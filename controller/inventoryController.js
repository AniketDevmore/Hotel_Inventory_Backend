const { categoryList, unitList, addNewInventory, updateInventoryData, removeInventory } = require("../db/db");

const getCategoryList = (req, res, next) => {
    categoryList()
        .then((data) => {
            //   console.log("data=>", data);
            let newData = data.map(cat => cat.category)
            res.json({
                status: true,
                data: newData,
                message: "Category list fetched successfully",
            });
        })
        .catch((err) => {
            console.error("Error fetching categories:", err);
            res.json({
                status: false,
                message: "Category list not found!",
            });
        });
};

const getInventoryUnitList = (req, res, next) => {
    unitList().then((data) => {
        //   console.log("data=>", data);
        let newData = data.map(unit => unit.unit)
        res.json({
            status: true,
            data: newData,
            message: "Unit list fetched successfully",
        });
    })
        .catch((err) => {
            console.error("Error fetching units:", err);
            res.json({
                status: false,
                message: "Unit list not found!",
            });
        });
}

const addInventory = (req, res, next) => {
    // console.log('req=>', req.body)
    addNewInventory(req.body).then((data) => {
        res.json({
            status: true,
            message: "Inventory added successfully"
        });
    })
        .catch((err) => {
            let message = err.message;

            // Check for unique constraint error (duplicate email)
            if (err.code === "23505") {
                // 23505 = unique_violation in PostgreSQL

                if (err.constraint === "hotel_id") {
                    message = "User id must be required as hotel_id";
                }
                if (err.constraint === "purchase_date") {
                    message = "Purchase date must be required!";
                }
                if (err.constraint === "name") {
                    message = "Name must be required!";
                }
                if (err.constraint === "category") {
                    message = "Category must be required!";
                }
                if (err.constraint === "quantity") {
                    message = "Quantity must be required!";
                }
                if (err.constraint === "unit") {
                    message = "Unit must be required!";
                }
                if (err.constraint === "cost") {
                    message = "Cost must be required!";
                }
            }

            res.json({
                status: false,
                message,
            });
        });
}

const updateInventory = (req, res, next) => {
    updateInventoryData(req.body).then((data) => {
        res.json({
            status: true,
            message: "Inventory added successfully"
        });
    })
        .catch((err) => {
            let message = err.message;

            // Check for unique constraint error (duplicate email)
            if (err.code === "23505") {
                // 23505 = unique_violation in PostgreSQL

                if (err.constraint === "hotel_id") {
                    message = "User id must be required as hotel_id";
                }
            }

            res.json({
                status: false,
                message,
            });
        });
};

const editInventory = (req, res, next) => {
    // console.log('req=>', req.body)
    addNewInventory(req.body).then((data) => {
        res.json({
            status: true,
            message: "Inventory added successfully"
        });
    })
        .catch((err) => {
            let message = err.message;

            console.log('err-->>', err.constraint)
            // Check for unique constraint error (duplicate email)
            if (err.code === "23502") {
                // 23505 = unique_violation in PostgreSQL

                if (err.constraint === "hotel_id") {
                    message = "User id must be required as hotel_id";
                }
                if (err.constraint === "purchase_date") {
                    message = "Purchase date must be required!";
                }
                if (err.constraint === "name") {
                    message = "Name must be required!";
                }
                if (err.constraint === "category") {
                    message = "Category must be required!";
                }
                if (err.constraint === "quantity") {
                    message = "Quantity must be required!";
                }
                if (err.constraint === "unit") {
                    message = "Unit must be required!";
                }
                if (err.constraint === "cost") {
                    message = "Cost must be required!";
                }
            }

            res.json({
                status: false,
                message,
            });
        });
}

const deleteInventory = (req, res, next) => {
    // console.log('req', req.body)
    removeInventory(req.body).then(data => {
        res.json({
            status: true,
            message: "Inventory deleted successfully"
        });
    }).catch(err => {
        let message = err.message;

        res.json({
            status: false,
            message,
        });
    })
}

module.exports = {
    getCategoryList,
    getInventoryUnitList,
    addInventory,
    updateInventory,
    editInventory,
    deleteInventory
};
