
const mysql = require("mysql");
const path = require("path")
const fs = require("fs")
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "jwt",
  });

  const getImg =async(req, res) => {
    var filePath = path.join(__dirname, '../Upload/Cat03.jpg');
    console.log(filePath)
    const imageBuffer = fs.readFileSync(filePath);
    // res.setHeader('Content-Type', 'image/svg+xml');
    // res.send(imageBuffer);
    res.sendFile(path.join(__dirname, "../Upload/Cat03.jpg"));
}

module.exports = {getImg}