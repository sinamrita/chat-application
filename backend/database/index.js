const mongoose = require('mongoose')
const db_connection = () => {
    return new Promise(async (resolve,reject) => {
        try{
            const connected = await  mongoose.connect(process.env.DATABASE_URI,{
                dbName:'chat_app'
            })
            resolve(connected)
            console.log("Database Connected")
        }catch(err){
            console.log(err)
            reject(err)
        }
    });
}

module.exports = { db_connection }
