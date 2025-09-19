const { categoryList, unitList } = require("../db/db");

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

module.exports = {
    getCategoryList,
    getInventoryUnitList
};
