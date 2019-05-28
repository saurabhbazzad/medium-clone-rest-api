const express=require('express')
const {db}=require('./models')

const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api',require('./routes/api'))

db.sync()
    .then(()=>{
        const port=5001
        app.listen(port,()=>{
        console.log(`Server running on http://localhost:${port}`)
        })
    })
    .catch(err=>{
        console.log(err)
    })

