import  jwt  from "jsonwebtoken";
require("dotenv").config();
const nonSecurePaths = ['/', '/login', '/register','/user/read','/user/create','/user/update','/user/delete'];
// '/account','/user/read','/user/create','/user/update','/user/delete'
const createJWT = (payload)=> {
    //let payload  = { name : 'zero', address : 'hcm'};
    let key = process.env.JWT_SECRET;
    let token=null;
    try {
         //var token = jwt.sign({ key: 'value' }, 'password');
        token = jwt.sign(payload, key,{
            expiresIn: process.env.JWT_EXPIREs_IN
        });
        console.log(token);
    } catch (error) {
        console.log(error);
    }
  return token;
    
}


const verifyToken =(token)=>{
    let key = process.env.JWT_SECRET;
    let decoded=null;

    try {
        //var token = jwt.sign({ key: 'value' }, 'password');
       decoded = jwt.verify(token, key);
   } catch (error) {
       console.log(error);
   }
   return decoded;
}
const checkUserJWT =(req, res, next) =>{
    if (nonSecurePaths.includes(req.path)) return next();
let cookies  = req.cookies;
if(cookies && cookies.jwt){
    let token = cookies.jwt;
    let decoded = verifyToken(token);
    if(decoded){
        req.user=decoded;
        req.token=token;
        next();
    }else{
        return res.status(401).json({
            EC: -1,
            DT: '',
            EM: 'Not authenticated the user'
          
        })
    }
}else{
    return res.status(401).json({
        EC: -1,
        DT: '',
        EM: 'Not authenticated the user'
    })
}
}
const checkUserPermission=(req, res, next) =>{

    if (nonSecurePaths.includes(req.path) || req.path === '/account') return next();
    if(req.user){
        let email= req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl=req.path;
        if(!roles || roles.length === 0){
            return res.status(403).json({
                EC: -1,
                EM: 'You don permisstion to acccess this resource',
                DT: ''
            })
        }
        let canAccess= roles.some(item => item.url ===currentUrl);
        if(canAccess===true){
            next();
        } else{
            return res.status(403).json({
                EC: -1,
                EM: 'You don permisstion to acccess this resource',
                DT: ''
            })
        }
       
    }else{
        return res.status(401).json({
            EC: -1,
            EM: 'You don permisstion to acccess this resource',
            DT: ''
        })
    }
}

module.exports={
    createJWT,verifyToken,checkUserJWT,checkUserPermission
}