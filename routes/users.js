const router = require('express').Router()
const {singUp,logIn,getUsers,getUser,updateUser,deleteUser} =require('../controllers/users')

const auth = require('../config/auth')

/**
 * @swagger
 * /users/singUp:
 *  post:
 *      tags: [Users]
 *      summary: Creates a user.
 *      description: It lets you create an account
 *      parameters:
 *          - in: body
 *            name: username
 *            required: true
 *            type: string
 *            description: It is a username that you would like to use.
 *          - in: body
 *            name: name
 *            required: true
 *            type: string
 *            description: It's your real name.
 *          - in: body
 *            name: surname
 *            required: true
 *            type: string
 *            description: It's your surname.
 *          - in: body
 *            name: email
 *            required: true
 *            type: string
 *            description: It's your email
 *          - in: body
 *            name: password
 *            required: true
 *            type: string
 *            description: It's a password for your account
 *          - in: body
 *            name: admin
 *            required: true
 *            type: Boolean
 *            description: It determines if you are an admin or not.
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: User created correctly.
 *              type: json
 *          403:
 *              description: An error due the lack of a component or if it repeated.
 *              type: json
 */
router.post('/signUp',singUp);

/**
 * @swagger
 * /users/logIn:
 *  post:
 *      tags: [Users]
 *      summary: You can log in.
 *      description: It lets you log in with your account.
 *      parameters:
 *          - in: body
 *            name: username
 *            required: true
 *            type: string
 *            description: It is the username you selected.
 *          - in: body
 *            name: password
 *            required: true
 *            type: string
 *            description: It's your password.
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: User log in correctly.
 *              type: json
 *          403:
 *              description: Password or username are wrong.
 *              type: json
 */

router.post('/logIn',logIn)

/**
 * @swagger
 * /users/:
 *  get:
 *      tags: [Users]
 *      summary: Available users.
 *      description: It gives you a list of users, you need to be authenticated and you have to be an admin.
 *      security:
 *          - Bearer: []
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: All characters available in the API.
 *              type: json
 *          403:
 *              description: Authentication is needed.
 *              type: json
 */

router.get('/',auth.isAdmin,getUsers)

/**
 * @swagger
 * /users/{id}:
 *  get:
 *      tags: [Users]
 *      summary: User available.
 *      description: It gives you a user, you need to be authenticated and you have to be an admin.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the user.
 *      produce:
 *          - application/json
 *      responses:
 *          200:
 *              description: User available in the API.
 *              type: json
 *          403:
 *              description: Authentication is needed.
 *              type: json
 *          404:
 *              description: User not found in the API.
 *              type: json
 */

router.get('/:id',auth.isAdmin,getUser)

/**
 * @swagger
 * /users/{id}:
 *  patch:
 *      tags: [Users]
 *      summary: Modifies a user.
 *      description: It lets you modify a user, it is needed an authentication and you can only modify your own profile.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the user.
 *          - in: body
 *            name: username
 *            required: false
 *            type: string
 *            description: A new username.
 *          - in: body
 *            name: name
 *            required: false
 *            type: string
 *            description: New name of the user.
 *          - in: body
 *            name: surname
 *            required: false
 *            type: string
 *            description: New surname of the user.
 *          - in: body
 *            name: email
 *            required: false
 *            type: string
 *            description: New email of the user.
 *          - in: body
 *            name: password
 *            required: false
 *            type: string
 *            description: New password of the user.
  *          - in: body
 *            name: admin
 *            required: false
 *            type: Boolean
 *            description: New state of the user.
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
 *              description: You are trying to modify another profile.
 *              type: json
 */

router.patch('/:id',auth.ismyprofile,updateUser)

/**
 * @swagger
 * /users/{id}:
 *  delete:
 *      tags: [Users]
 *      summary: Deletes a user.
 *      description: It lets you delete a user, it is needed an authentication and you can only delete your own profile.
 *      security:
 *          - Bearer: []
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            type: integer
 *            description: ID of the user.
 *      produce:
 *          - application/json
 *      responses:
 *          201:
 *              description: User deleted correctly.
 *              type: json
 *          401:
 *              description: No login.
 *              type: json
 *          403:
 *              description: You are trying to delete another profile.
 *              type: json
 */

router.delete('/:id',auth.ismyprofile,deleteUser)

module.exports = router