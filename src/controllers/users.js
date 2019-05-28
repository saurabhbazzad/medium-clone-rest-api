
const {Users}=require('../models')

async function createUser(userOpts){
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

    return user
}

async function verifyUser(userOpts){
    if(!userOpts.email){
        throw new Error('Did not supply email')
    }
    if(!userOpts.password){
        throw new Error('Did not supply password')
    }

    const user=Users.findOne({
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

    return user
}


module.exports={
    createUser,
    verifyUser
}