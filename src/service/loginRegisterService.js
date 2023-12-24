import db from "../models";
require('dotenv').config();
import { Op } from "sequelize";
import bcrypt from 'bcryptjs';
import {getGroupWithRoles} from './JWTService';
import {createJWT} from '../middleware/JWTAction';
const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}
 const checkEmailExist = async(userEmail) => {
let user = await db.User.findOne({
    where : {email : userEmail}
});

if(user) {
    return true;
}
return false;
 }

 const checkPhoneExist = async(userPhone) => {
    let user = await db.User.findOne({
        where : {phone : userPhone}
    });
    
    if(user) {
        return true;
    }
    return false;
     }

const registerNewUser = async(rawUserData)=> {
    try {
    //check email/phone are exist 
let isEmailExist = await checkEmailExist(rawUserData.email);
if(isEmailExist===true) {
    return{
        EM : 'The email already exist',
        EC : 1
    }
}
let isPhoneExist = await checkPhoneExist(rawUserData.phone);
if(isPhoneExist===true) {
    return{
        EM : 'The phone number already exist',
        EC : 1
    }
    
}
//hash user password
let hashPassword = hashUserPassword(rawUserData.password);
    //create new user
await db.User.create({
    email: rawUserData.email,
    username: rawUserData.username,
    password: hashPassword,
    phone : rawUserData.phone,
    groupId : 4
    
})
return{
    EM : 'create user successfully',
    EC : 0
}
}catch(e){
        console.log(e);
        return{
            EM : 'error from server',
            EC : -2
        }
}
}
const chekPassword = (inputPassword, hashPassword)=> {
    return bcrypt.compareSync(inputPassword, hashPassword);
}
const handleUserLogin = async(rawData)=> {
try{
    let user = await db.User.findOne ({
        where : {
            [Op.or] : [
                {email: rawData.valueLogin},
                {phone : rawData.valueLogin}
            ]
        }
    })
    if(user) {
        console.log("not found user with email/phone  ");
        let isCorrectPassword = chekPassword(rawData.password, user.password);
        if(isCorrectPassword===true) {

            let groupWithRoles=await getGroupWithRoles(user);
            let payload = {
                email:user.email,
                groupWithRoles,
                username: user.username,
                //expiresIn: process.env.JWT_EXPIREs_IN
            }
            let token = createJWT(payload);
            return{
                EM : 'ok',
                EC : 0,
                DT: {
                    access_token:token,
                    groupWithRoles,
                    email: user.email,
                    username: user.username
                }
        
            }
        }
    }
    console.log("not found user with email/phone  ", rawData.valueLogin, "pasword", rawData.password);
        return{
            EM : 'Your email/phone or password is incorrect',
            EC : 1,
            DT: ''
    
        }
}
catch(error)
{
    console.log(error);
    return{
        EM : 'error from server',
        EC : -2
    }
}
}
module.exports = {
    registerNewUser,
    checkEmailExist,
    checkPhoneExist,
    handleUserLogin,
    hashUserPassword
}