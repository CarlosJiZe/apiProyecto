const {Sequelize,DataTypes} =require('sequelize');
const sequelize = require('../config/db');
const Character = require('./characters');

const Anime = sequelize.define('Anime',{
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    synopsis:{
        type:DataTypes.TEXT,
        allowNull:false
    }
});

Anime.hasMany(Character, { as: "Characters", foreignKey: 'AnimeId',foreignKey:{allowNull:false}});
Character.belongsTo(Anime, {as:'Anime'});

module.exports=Anime;
