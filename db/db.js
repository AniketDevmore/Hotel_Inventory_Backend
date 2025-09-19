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
        console.log("result =>", result.rows);
        resolve(result.rows[0]); // return inserted user
      } else {
        reject(new Error("User not created"));
      }
    } catch (err) {
      console.error("err-->>", err);
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

module.exports = {
  createNewUser,
  getUserByEmail,
  categoryList,
  unitList,
  addNewInventory
}