const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "jwt",
});

const getAllCate = async (req, res) => {
  const sql = "SELECT * FROM category ";
  db.query(sql, (err, data) => {
    console.log(data);
    if (err) return res.json("Error");
    return res.json(data);
  });
};

const CreateCate = async (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO category (NameCate) VALUES (?)";
  db.query(sql, [req.body.Name], (err, data) => {
    console.log(data);
    if (err) return res.json("Error");
    return res.json(data);
  });
};

const UpdateCate = async (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  console.log(id);
  const sql = "Update category set NameCate=? WHERE IdCate = ?";
  db.query(sql, [req.body.Name, id], (err, data) => {
    console.log(data);
    if (err) return res.json("Error");
    return res.json(data);
  });
};

const DeleteCate = async (req, res) => {
  console.log(req.params.id);
  const sql = "Delete from category WHERE IdCate = ?";
  db.query(sql, [req.params.id], (err, data) => {
    console.log(data);
    if (err) return res.json("Error");
    return res.json(data);
  });
};

module.exports = {
  getAllCate,
  CreateCate,
  UpdateCate,
  DeleteCate,
};
