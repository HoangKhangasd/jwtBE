import bcrypt from 'bcryptjs';
import mysql from  'mysql2/promise';
const salt = bcrypt.genSaltSync(10);
import db from '../models';

// get the clien

// get the promise implementation, we will use bluebird

// create the connection, specify bluebird as Promise

// create the connection to database
        // const connection = mysql.createConnection({
        //     host: 'localhost',
        //     user: 'root',
        //     database: 'jwt'
        // });
// Store hash in your password DB.
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
 const createNewUser = async(email, password, username) => {
        let hashPass = hashUserPassword(password);
       await db.User.create(
            {
                email: email,
                password: hashPass,
                username: username
            }
        )
        //const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
        //const [rows, fields] = await connection.execute( 'INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username]);
        // simple query
//  connection.query(
//      'INSERT INTO user (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
//      function(err, results, fields) {
//          if(err) {
//              console.log(err); // results contains rows returned by server
//          }

//      }
//    );
 }
 const getUserList = async() => {
//  let newUser =await db.User.findOne({
//   where : {id : 1},
//   attributes : ["id", "username", "email"],
//   include : { model : db.Group, attributes : ["name", "description"], },
//   raw : true,
//   nest : true
//  })


// let r = await db.Role.findAll({
//   include : { model : db.Group, where : {id : 1} },
//   raw : true,
//   nest : true
// })
// console.log("check newUser", newUser)
    let users = [];
    users = await db.User.findAll();
    return users;
    //const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});



    //     connection.query(
//     'SELECT * FROM user ',
//     function(err, results, fields) {
//         if(err) {
//             console.log(err); // results contains rows returned by server
//             return user;
//         }
//             user=results;
//             return user;
//     }
//   );



// try {
//     const [rows, fields] = await connection.execute('SELECT * FROM user');
//    return rows;
// }catch(error) {
//     console.log("check error",error)
// }

 }
 const deleteUser = async(id) => {

    await db.User.destroy({
        where: {
          id:id
        }
      })
    // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id =?',[id]);
    //    return rows;
    // }catch(error) {
    //     console.log("check error",error)
    // }
    
 }
 const getUserById = async(id) => {

    let user = {};
   user = await db.User.findOne({ where: { id: id } });
    return user.get({plain : true});
    // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM user WHERE id =?',[id]);
    //    return rows;
    // }catch(error) {
    //     console.log("check error",error)
    // }
 }
 const updateUserInfor = async(email, username, id) => {
    await db.User.update(
      { email:email , username:username }, 
      {
        where: {id: id }
      }
      );
    // const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'jwt', Promise: bluebird});
    // try {
    //     const [rows, fields] = await connection.execute('UPDATE user SET email = ?, username=? WHERE id = ?',[email,username,id]);
    //    return rows;
    // }catch(error) {
    //     console.log("check error",error)
    // }
 }
module.exports = {
    createNewUser, getUserList, deleteUser, updateUserInfor, getUserById
 }