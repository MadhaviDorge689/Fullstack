const M=require('mongoose')
M.connect('mongodb+srv://madhavid1807:3otUVgn0wKksOU8r@cluster0.elstu0c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then( ()=>{
    console.log("server is connected to database")
})
.catch( ()=>{
    console.log("database is not connected")
})
