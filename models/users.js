const crypto = require('crypto')
const {Sequelize,DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const jwt = require('jsonwebtoken')
const secret = require('../config/secret')


const User = sequelize.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isLowercase:true,
            is: /^[a-zA-Z0-9_-]+$/
        }
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    surname:{
        type:DataTypes.STRING,
        allowNull: false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password_hash: {
        type:DataTypes.TEXT,
        allowNull:true
    },
    password_salt:{
        type:DataTypes.TEXT,
        allowNull:true
    },
    admin:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
})

User.createPassword = function(plainText) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(plainText, salt, 10000, 512, "sha512")
        .toString("hex");
    return {salt: salt, hash: hash}
}

User.validatePassword = function(password,user_salt,user_hash){
    const hash= crypto
        .pbkdf2Sync(password,user_salt,10000,512,"sha512")
        .toString('hex')
    return user_hash === hash
}

User.generateJWT = function(user){
    const today = new Date();
    const exp = new Date(today)
    exp.setDate(today.getDate()+60)
    return jwt.sign({
        user: user.username,
        admin:user.admin,
        id:user.id,
        exp: parseInt(exp.getTime()/1000)
    },secret) 
}

module.exports=User;