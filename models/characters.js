const {Sequelize,DataTypes} =require('sequelize');
const sequelize = require('../config/db');

const Character = sequelize.define('Character',{
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    age:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull:false
    }
})

module.exports = Character;