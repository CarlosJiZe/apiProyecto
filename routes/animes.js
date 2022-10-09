const router = require('express').Router();

const{
    createAnime,
    getAnime,
    getAnimes,
    updateAnime,
    deleteAnime
} = require('../controllers/animes')

const auth = require('../config/auth')

const passport = require('passport')

/**
 * @swagger
 * /animes/:
 *  get:
 *      tags: [Animes]
 *      summary: Available animes.
 *      description: It gives you a list of animes.
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: All animes available in the API.
 *              type: json
 */
router.get('/',getAnimes)

/**
 * @swagger
 * /animes/{id}:
 *  get:
 *      tags: [Animes]
 *      summary: Anime available.
 *      description: It gives you an anime.
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the anime.
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: Anime available in the API.
 *              type: json
 *          404:
 *              description: Anime not found in the API.
 *              type: json
 */
router.get('/:id',getAnime)
/**
 * @swagger
 * /animes/:
 *  post:
 *      tags: [Animes]
 *      summary: Creates an anime.
 *      description: It adds a new anime, it is needed an authentication.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: body
 *            name: name
 *            required: true
 *            type: string
 *            description: Name of the anime.
 *          - in: body
 *            name: synopsis
 *            required: true
 *            type: string
 *            description: Description of the anime
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: Anime created correctly.
 *              type: json
 *          401:
 *              description: Login required.
 *              type: json
 */
router.post('/',passport.authenticate('bearer',{session:false}),createAnime)

/**
 * @swagger
 * /animes/{id}:
 *  patch:
 *      tags: [Animes]
 *      summary: Modifies an anime.
 *      description: It lets you modify an anime, it is needed an authentication and you have to be an admin.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the anime.
 *          - in: body
 *            name: name
 *            required: false
 *            type: string
 *            description: Name of the anime
 *          - in: body
 *            name: synopsis
 *            required: false
 *            type: string
 *            description: Description of the anime
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: Anime modified correctly.
 *              type: json
 *          401:
 *              description: No login.
 *              type: json
 *          403:
 *              description: Authorization required.
 *              type: json
 */
router.patch('/:id',auth.isAdmin,updateAnime)

/**
 * @swagger
 * /animes/{id}:
 *  delete:
 *      tags: [Animes]
 *      summary: Deletes an anime.
 *      description: It deletes an anime, it is needed an authentication and you have to be an admin.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: string
 *            description: ID of the anime.
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: Anime deleted correctly.
 *              type: json
 *          401:
 *              description: Login required.
 *              type: json
 *          403:
 *              description: Authorization required.
 *              type: json
 *          404:
 *              description: Anime not found.
 *              type: json
 */

router.delete('/:id',auth.isAdmin,deleteAnime)

module.exports=router;