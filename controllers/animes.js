const Anime = require('../models/animes');
const Character= require('../models/characters')

async function createAnime(req,res){
    const body = req.body;
    try{
        const anime=await Anime.create(body)
        res.status(201).json(anime)
    }catch(err){
        if( err.name==="SequelizeValidationError" || err.name==="SequelizeUniqueConstraintError"){
            return res.status(400).json({
                error:err.errors.map(e=>e.message)
            })
        }
    }

}

async function getAnime(req,res){
    const id = req.params.id;
    const anime = await Anime.findByPk(id,{
        include:{
            model:Character,
            as: 'Characters',
            attributes: ['id','name']
        }
    })
    if(anime != null){
        res.status(200).json(anime)
    }else{
        res.status(404).json({Error:'Anime not found'})
    }
    
}

async function getAnimes(req,res){
    const animes= await Anime.findAll({
        include:{
            model:Character,
            as: 'Characters',
            attributes: ['id','name']
        }
    })
    res.status(200).json(animes);
}

async function updateAnime(req,res){
    const id=req.params.id;
    const animei=req.body;
    const found = await Anime.findAll()
    found.forEach((anime)=>{
        if(animei.name===anime.name){
          return  res.status(400).json({Error:'This name already exists'})
        }
    })
    try{
        const update= await Anime.update(animei,{where:{id:id}});
        const anime_updated= await Anime.findByPk(id)
        res.status(200).json(anime_updated)
    }catch{
        
    }

    
}

async function deleteAnime(req,res){
    const id=req.params.id;
    const deleted = await Anime.destroy(
        {where:{id:id}}
    )
    if(deleted===1){
        res.status(200).json({Sucess:'Anime deleted'})
    }else{
        res.status(404).json({Error:'Anime not found'})
    }
    
}

module.exports = {
    createAnime,
    getAnime,
    getAnimes,
    updateAnime,
    deleteAnime
}