const {Router}=require('express')
const {createUser,verifyUser}=require('../../controllers/users')

const route=Router()

route.post('/', async (req,res,next)=>{
    console.log(req.body)
    console.log(req.body.user)
    const createdUser=await createUser(req.body.user)
    res.send(createdUser)
})

route.post('/login', async (req,res,next)=>{
    try{
        const verifiedUser=await verifyUser(req.body.user)
        res.send(verifiedUser)
    }catch(err){
        res.status(403).send({
            errors:{
                body:[err.message]
        }
        })
    }
})

module.exports=route