
const {Users}=require('../models')
const {createJwt}=require('../utils/jwt')

async function createUser(userOpts){
    console.log(userOpts)
    if(!userOpts.username){
        throw new Error('Did not supply username')
    }
    if(!userOpts.email){
        throw new Error('Did not supply email')
    }
    if(!userOpts.password){
        throw new Error('Did not supply password')
    }

    const user=await Users.create({...userOpts})
        //TODO:Save Password in hash form

    if(!user){
        throw new Error('Error creating User')
    }

    const createdUser=await Users.findOne({
        attributes:['email','username','bio','image'],
        where:{
            username:user.username
        }
    })

    const token=await createJwt(createdUser.get())

    return {
        ...createdUser.get(),
        token
    }
}

async function verifyUser(userOpts){
    if(!userOpts.email){
        throw new Error('Did not supply email')
    }
    if(!userOpts.password){
        throw new Error('Did not supply password')
    }

    const user= await Users.findOne({
        attributes:[email,username,bio,image,password],
        where:{
            email:userOpts.email
        }
    })

    if(!user){
        throw new Error('No user with given email address')
    }

    if(user.password!==userOpts.password){
        throw new Error('Password did not match')
    }

    const token=await createJwt(user.get())
    const userJson={
        ...user.get(),
        token
    }

    delete userJson.password
    return userJson
}

module.exports={
    createUser,
    verifyUser
}