import foodService from "../service/foodService";
const mysql = require("mysql");
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt",
  });
const getAllFood =async(req, res) => {

        const sql = "SELECT * FROM food ";
        db.query(sql, (err, data) => {
          console.log(data)
          if (err) return res.json("Error");
          return res.json(data);
        })

}

module.exports ={getAllFood}