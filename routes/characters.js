const router = require('express').Router();
const{
    createCharacter,
    getCharacter,
    getCharacters,
    updateCharacter,
    deleteCharacter
} = require('../controllers/characters')

const auth = require('../config/auth')

/**
 * @swagger
 * /characters/:
 *  get:
 *      tags: [Characters]
 *      summary: Available characters.
 *      description: It gives you a list of characters.
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: All characters available in the API.
 *              type: json
 */
router.get('/',getCharacters);
/**
 * @swagger
 * /characters/{id}:
 *  get:
 *      tags: [Characters]
 *      summary: Character available.
 *      description: It gives you a character of an anime.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the character.
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: Character available in the API.
 *              type: json
 *          404:
 *              description: Character not found in the API.
 *              type: json
 */
router.get('/:id',getCharacter);

/**
 * @swagger
 * /characters/:
 *  post:
 *      tags: [Characters]
 *      summary: Creates a character of a anime.
 *      description: It adds a new character to an anime, it is needed an authentication and the AnimeId.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: body
 *            name: name
 *            required: true
 *            type: string
 *            description: Name of the character.
 *          - in: body
 *            name: age
 *            required: true
 *            type: integer
 *            description: Age of the character.
 *          - in: body
 *            name: gender
 *            required: true
 *            type: string
 *            description: Gender of the character.
 *          - in: body
 *            name: description
 *            required: true
 *            type: string
 *            description: A description of the character, it's personality or it's physical characteristics.
  *          - in: body
 *            name: AnimeId
 *            required: true
 *            type: integer
 *            description: ID of the anime the character belongs to.
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: Character created correctly.
 *              type: json
 *          401:
 *              description: Login required.
 *              type: json
 */
router.post('/',auth.required,createCharacter);

/**
 * @swagger
 * /characters/{id}:
 *  patch:
 *      tags: [Characters]
 *      summary: Modifies a character.
 *      description: It lets you modify a character, it is needed an authentication and you have to be an admin.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the character.
 *          - in: body
 *            name: name
 *            required: false
 *            type: string
 *            description: Name of the character.
 *          - in: body
 *            name: age
 *            required: false
 *            type: string
 *            description: Age of the character.
 *          - in: body
 *            name: gender
 *            required: false
 *            type: string
 *            description: Gender of the character.
 *          - in: body
 *            name: description
 *            required: false
 *            type: string
 *            description: A description of the character, it's personality or it's physical characteristics.
  *          - in: body
 *            name: AnimeId
 *            required: false
 *            type: integer
 *            description: ID of the anime the character belongs to.
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: Character modified correctly.
 *              type: json
 *          401:
 *              description: No login.
 *              type: json
 *          403:
 *              description: Authorization required.
 *              type: json
 */

router.patch('/:id',auth.isAdmin,updateCharacter)

/**
 * @swagger
 * /characters/{id}:
 *  delete:
 *      tags: [Characters]
 *      summary: Deletes a character.
 *      description: It deletes a character, it is needed an authentication and you have to be an admin.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: string
 *            description: ID of the character.
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: Character deleted correctly.
 *              type: json
 *          401:
 *              description: Login required.
 *              type: json
 *          403:
 *              description: Authorization required.
 *              type: json
 *          404:
 *              description: Character not found.
 *              type: json
 */

router.delete('/:id',auth.isAdmin,deleteCharacter)

module.exports=router;