const router = require('express').Router();

const{
    createAnime,
    getAnime,
    getAnimes,
    updateAnime,
    deleteAnime
} = require('../controllers/animes')

const auth = require('../config/auth')

router.get('/',getAnimes)
router.get('/:id',getAnime)
router.post('/',auth.required,createAnime)
router.patch('/:id',auth.isAdmin,updateAnime)
router.delete('/:id',auth.isAdmin,deleteAnime)

module.exports=router;