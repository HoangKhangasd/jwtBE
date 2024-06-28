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

const getFoodCate = async (req, res) => {
  const Name = `${req.body.Cate}`;
  const sql = "SELECT * FROM food where CateId = ? ";
  db.query(sql, [Name], (err, data) => {
    if (err) return res.json("Error");
    return res.json(data);
  });
};

const CreateFood = async (req, res) => {
  console.log(req.body);
  const sql = "INSERT INTO food (NameF,PriceF,ImgF,CateId) VALUES (?,?,?,?)";
  db.query(
    sql,
    [req.body.Name, req.body.Price, req.body.Img, req.body.Cate],
    (err, data) => {
      console.log(data);
      if (err) return res.json("Error");
      return res.json(data);
    }
  );
};

const UpdateFood = async (req, res) => {
  console.log(req.body)
  const id = req.params.idFood;
  console.log(id)
  const sql =
    "Update food set NameF=?, PriceF=?, ImgF=?, CateId=? WHERE idFood = ?";
  db.query(
    sql,
    [req.body.NameF, req.body.PriceF, req.body.ImgF, req.body.CateId, id],
    (err, data) => {
      console.log(data);
      if (err) return res.json("Error");
      return res.json(data);
    }
  );
};

const DeleteFood = async (req, res) => {
 
  const sql = "Delete from food WHERE idFood = ?";
  db.query(sql, [req.params.idF], (err, data) => {
  
    if (err) return res.json("Error");
    return res.json(data);
  });
};

module.exports ={getAllFood,getFoodCate,DeleteFood,UpdateFood,CreateFood}