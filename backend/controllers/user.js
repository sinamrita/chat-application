const users = require('../models/users')

const get_users = async (req,res) => {
    
    try{
        
        const loggedInUserId = req.user._id;

        const filterUsers = await users.find({_id : {$ne : loggedInUserId}}).select('-password');

        if(filterUsers.length !== 0){
            res.status(200).json({
                code: 1,
                message: "Users fetch successfully.",
                users: filterUsers
            });
        }else{
            res.status(203).json({
                code: 0,
                message: "Users not found.",
                users: []
            });
        }
        
    }catch(err) {
        console.error(err)
        res.status(500).json({
            code: 0,
            message: "Internal Server Error."
        });
    }

}

module.exports = {
    get_users
}