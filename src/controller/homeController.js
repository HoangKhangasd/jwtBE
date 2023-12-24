import userService from '../service/userService';




const handleHelloWorld = (req, res)=> {
    return res.render("home.ejs");
}

const handleUserPage = async(req, res) => {
    let userList = await userService.getUserList();
     await userService.deleteUser(2);
    //console.log("check   ", userList)
    return res.render("user.ejs",{userList});
}
const handlCreateNewUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;
userService.createNewUser(email,password,username)
userService.getUserList();
    return res.redirect("/user");
    //return app.use("/user", router);
}
const handleDeleteUser = async(req, res) => {
    await userService.deleteUser(req.params.id);
    return res.redirect("/user");
}
const getUpdateUserPage = async(req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;
    // if(user && user.length > 0) {
    //     userData = user[0];
    // }
    return res.render("user-update.ejs", {userData});
    // let email = req.body.email;
    // let username = req.body.username;
    // await userService.updateUser(email,username, req.params.id);
   // return res.redirect("/user");
}
const handlUpdateUser =async(req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
await userService.updateUserInfor(email,username, id);
    return res.redirect("/user");
}
module.exports = {
    handleHelloWorld, handleUserPage, handlCreateNewUser, handleDeleteUser, getUpdateUserPage, handlUpdateUser
}