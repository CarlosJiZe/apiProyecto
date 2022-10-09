const router = require('express').Router();
const{
    createCharacter,
    getCharacter,
    getCharacters,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters')

const auth = require('../config/auth')

router.get('/',getCharacters);
router.get('/:id',getCharacter);
router.post('/',auth.required,createCharacter);
router.patch('/:id',auth.isAdmin,updateCharacter)
router.delete('/:id',auth.isAdmin,deleteCharacter)

module.exports=router;