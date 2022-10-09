const router = require('express').Router();
const characters= require('./characters')
const animes=require('./animes')
const users=require('./users')

router.get('/',(req,res)=>{
    res.json({'info':'Welcome to an anime API!'})
});

router.use('/characters',characters)
router.use('/animes',animes)
router.use('/users',users)

module.exports= router;


