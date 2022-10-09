const User = require('../models/users')


async function singUp(req,res){
    const body = req.body;
    try{
        const user = await User.create(body)
        const {salt,hash} =User.createPassword(body['password'])
        user.password_salt = salt
        user.password_hash = hash
        await user.save()
        res.status(201).json(user)
    }catch(err){
        if(err.name==="SequelizeValidationError" || err.name==="SequelizeUniqueConstraintError"){
            return res.status(400).json({
                error: err.errors.map(e=>e.message)
            })
        }else{
            throw err
        }
    }
}

async function logIn(req,res){
    const body = req.body;
    const user = await User.findOne({where:{username:body['username']}});
    if(!user){
        return res.status(404).json({error:'User not found'})
    }
    if (User.validatePassword(body['password'],user.password_salt,user.password_hash)){
        return res.status(200).json({
            user: user.username,
            email:user.email,
            token:User.generateJWT(user)
        })
    }else{
        return res.status(400).json({message:'Wrong password o user'})
    }
}

async function getUsers(req,res){
    const users = await User.findAll()
    res.status(200).json(users)
}

async function getUser(req,res){
    const id = req.params.id;
    const user=await User.findByPk(id)
    if (user != null){
        res.status(200).json(user)
    }else{
        res.status(404).json({Error: 'User not found'})
    }
}

async function updateUser(req,res){
    const id = req.params.id
    const user= req.body
    const update = await User.update(user,{where:{id:id}})
    const user_updated = await User.findByPk(id)
    res.status(200).json(user_updated)
}

async function deleteUser(req,res){
    const id = req.params.id
    const deleted = await User.destroy({where:{id:id}})
    if(deleted ===1){
        res.status(200).json({Sucess:"User deleted"})
    }else{
        res.status(404).json({Error:'User not found'})
    }
}

module.exports = {
    singUp,
    logIn,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}