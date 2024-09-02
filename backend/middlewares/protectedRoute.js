const jwt = require('jsonwebtoken');
const users = require('../models/users')

const protected = async (req,res,next) => {
    try{
        let token = req.headers['authorization']
    
        if(!token) {
            res.status(401).json({
                code:0,
                message:"Unauthorized - Token required."
            })
            return
        }

        token = token.split(' ')[1]
    
        const decode_token = jwt.verify(token,process.env.SECRET_KEY)
    
        if(!decode_token){
            res.status(401).json({
                code:0,
                message:"Unauthorized - Invalid token."
            })
            return
        }
    
        const user = await users.findById(decode_token.id).select('-password')
    
        if(!user){
            res.status(401).json({
                code:0,
                message:"User not found."
            })
            return
        }

        req.user = user

        next()

    }catch(err) {
        console.error(err)
        res.status(500).json({
            code : 0,
            message : "Internal Server Error."
        })
    }
} 

module.exports = protected