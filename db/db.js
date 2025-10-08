const db = require('./postgrsql');

const createNewUser = (userData) => {
  // console.log("userdata =>", userData);

  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query(
        `INSERT INTO users (name, password, phone_number, email) 
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [userData.name, userData.password, userData.phone_number, userData.email]
      );

      if (result.rows[0]) {
        // console.log("result =>", result.rows);
        resolve(result.rows[0]); // return inserted user
      } else {
        reject(new Error("User not created"));
      }
    } catch (err) {
      reject(err); // reject with error
    }
  });
};

const getUserByEmail = (email) => {
  console.log("email =>", email);

  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("SELECT * FROM users WHERE email=$1", [email]);
      if (result.rows[0]) {
        // console.log("result =>", result.rows);
        resolve(result.rows[0]);
      } else {
        reject(new Error("User does not exist"));
      }
    } catch (err) {
      // console.error("err-->>", err);
      reject(err);
    }
  })
};

const getUserById = (userData) => {

  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("SELECT * FROM users WHERE email=$1 ", [userData.email])
      if (result.rows[0]) {
        if (result.rows[0].email === userData.email) {
          resolve(result.rows[0]);
        } else {
          reject(new Error("Please enter valid email!"))
        }
      } else {
        reject(new Error("User not found!"))
      }
    } catch (err) {
      reject(err)
    }
  })
}

const updatePassword = (userData) => {
  // console.log("userdata =>", userData);
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("UPDATE users SET password=$1 WHERE id=$2 RETURNING *", [userData.password, userData.id])
      if (result.rows[0]) {
        if (result.rows[0]) {
          resolve(result.rows[0]);
        } else {
          reject(new Error("Please enter valid email!"))
        }
      } else {
        reject(new Error("User not found!"))
      }
    } catch (err) {
      reject(err)
    }
  })
}

const categoryList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("SELECT * FROM product_category");

      // console.log('result=>', result);
      if (result.rows) {
        resolve(result.rows)
      } else {
        reject(new Error('Category list not found!'))
      }
    } catch (err) {
      reject(err);
    }
  })
};

const unitList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("SELECT * FROM inventory_unit");

      // console.log('result=>', result);
      if (result.rows) {
        resolve(result.rows)
      } else {
        reject(new Error('Unit list not found!'))
      }
    } catch (err) {
      reject(err);
    }
  })
}

const addNewInventory = (userData) => {
  // console.log("userdata =>", userData);
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query(
        `INSERT INTO inventory (hotel_id, name, category, quantity, unit, purchase_date, expiry_date, purchase_location, alert_level, stock_percentage, cost, notes) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
        [userData.hotel_id, userData.name, userData.category, userData.quantity, userData.unit, userData.purchaseDate, userData.expiryDate, userData.purchaseLocation, userData.alertLevel, userData.stockPercentage, userData.cost, userData.notes,]
      );

      if (result.rows[0]) {
        // console.log("result =>", result.rows);
        resolve(result.rows[0]); // return inserted user
      } else {
        reject(new Error("Unable to add inventory"));
      }
    } catch (err) {
      // console.error("err-->>", err);
      reject(err); // reject with error
    }
  });
};

const updateInventoryData = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let quantity = await db.query("SELECT quantity FROM inventory WHERE id=$1", [userData.id]);

      let usageDetails = await db.query("SELECT usage_details FROM inventory WHERE id=$1", [userData.id]);

      let newQuantity = quantity.rows[0].quantity
      if (quantity.rows[0].quantity > 0 && quantity.rows[0].quantity >= userData.quantityUsed) {
        newQuantity = quantity.rows[0].quantity - userData.quantityUsed;
      } else {
        reject(new Error("Insufficient stock!"));
      }

      let newUsageDetails = !usageDetails.rows[0].usage_details ? JSON.stringify(userData) : usageDetails.rows[0].usage_details + " " + JSON.stringify(userData);

      let result = await db.query("UPDATE inventory SET quantity=$1, usage_details=$2 WHERE id=$3 RETURNING *", [newQuantity, newUsageDetails, userData.id])

      // console.log('result=>', newUsageDetails)

      if (result.rows[0]) {
        // console.log("result =>", result.rows);
        resolve(result.rows[0]); // return inserted user
      } else {
        reject(new Error("Unable to update inventory"));
      }
    } catch (err) {
      // console.error("err-->>", err);
      reject(err); // reject with error
    }
  });
};

const editInventoryData = (userData) => {
  // console.log("userdata =>", userData);
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("UPDATE inventory SET name=$1, category=$2, quantity=$3, unit=$4, purchase_date=$5, expiry_date=$6, purchase_location=$7, alert_level=$8, stock_percentage=$9, cost=$10, notes=$11 WHERE id=$12 RETURNING *", [userData.name, userData.category, userData.quantity, userData.unit, userData.purchaseDate, userData.expiryDate, userData.purchaseLocation, userData.alertLevel, userData.stockPercentage, userData.cost, userData.notes, userData.id])

      if (result.rows[0]) {
        // console.log("result =>", result.rows);
        resolve(result.rows[0]);
      } else {
        reject(new Error("Unable to update inventory"));
      }
    } catch (err) {
      // console.error("err-->>", err);
      reject(err); // reject with error
    }
  });
};

const removeInventory = (userData) => {
  // console.log('userData', userData)
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query("DELETE FROM inventory WHERE id=$1 AND hotel_id=$2 RETURNING *", [userData.id, userData.hotel_id]);
      // console.log('result=>', result)
      if (result.rows[0]) {
        resolve(result.rows[0]);
      } else {
        reject(new Error("Unable to delete inventory"));
      }
    } catch (err) {
      reject(err);
    }
  })
}

const getInventory = (userData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await db.query('SELECT * FROM inventory WHERE hotel_id=$1', [userData.hotel_id]);
      console.log('result=>', result.rows);
      if (result.rows) {
        resolve(result.rows);
      } else {
        reject(new Error('Category list not found!'));
      }
    } catch (err) {
      reject(err)
    }
  })
}

module.exports = {
  createNewUser,
  getUserByEmail,
  getUserById,
  categoryList,
  unitList,
  addNewInventory,
  updateInventoryData,
  editInventoryData,
  removeInventory,
  getInventory,
  updatePassword
}

// {"id":"1","name":"Fresh Tomatoes","category":"Vegetables","quantity":15,"unit":"kg","purchaseDate":"2024-01-15","expiryDate":"2024-01-25","purchaseLocation":"Local Farm Market","alertLevel":"warning","stockPercentage":18.75,"cost":25.5,"notes":"Organic tomatoes from local farm"}
