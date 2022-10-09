const Character = require('../models/characters');
const Anime=require('../models/animes')

async function createCharacter(req,res){
    const fkey =req.body.AnimeId
    if(fkey != null){
        const body = req.body;
        try{
            const character=await Character.create(body)
            res.status(201).json(character) 
        }catch(err){
            if( err.name==="SequelizeValidationError" || err.name==="SequelizeUniqueConstraintError"){
                return res.status(400).json({
                    error:err.errors.map(e=>e.message)
                })
            }
        }

    }else{
        res.status(400).json({Error:'You have to specify an anime id'})
    }

}

async function getCharacter(req,res){
    const id = req.params.id;
    const character = await Character.findByPk(id,{
        include:{
            model:Anime,
            as:"Anime",
            attributes:['name']
        }
    })
    if(character != null){
        res.status(200).json(character)
    }else{
        res.status(404).json({Error:'Character not found'})
    }

}

async function getCharacters(req,res){
    const characters= await Character.findAll({
        include:{
            model:Anime,
            as:"Anime",
            attributes:['name']
        }
    })
    res.status(200).json(characters);
}

async function updateCharacter(req,res){
    const id=req.params.id;
    const characteri=req.body;
    const found = await Character.findAll()
    found.forEach((character)=>{
        if(characteri.name ===character.name){
            return  res.status(400).json({Error:'This name already exists'})
        }
    })
    try{
        const update= await Character.update(characteri,{where:{id:id}});
        const character_updated= await Character.findByPk(id)
        res.status(200).json(character_updated)
    }catch{
        
    }

}

async function deleteCharacter(req,res){
    const id=req.params.id;
    const deleted = await Character.destroy(
        {where:{id:id}}
    )
    if(deleted===1){
        res.status(200).json({Sucess:"Character deleted"})
    }else{
        res.status(404).json({Error:'Character not found'})
    }
    
}

module.exports = {
    createCharacter,
    getCharacter,
    getCharacters,
    updateCharacter,
    deleteCharacter
}