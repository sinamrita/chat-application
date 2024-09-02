const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors')
const express = require('express');
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');
const userRoutes = require('./routes/user');
const { db_connection } = require('./database/index');
const cookieParser = require('cookie-parser')
const { app, server } = require('./socketIO/socket')

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/auth',authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/user',userRoutes);

(async () => {
    try{
        await db_connection()
        server.listen(PORT,async () => {
            console.log(`Server started at ${PORT}`)
        })
    }catch(err){
        console.log(err)
    }
})();




