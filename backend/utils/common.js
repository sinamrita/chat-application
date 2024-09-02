const bcrypt = require('bcryptjs');

const encrypt_password = (password) =>{
    return new Promise((resolve,reject) =>{
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, function(err, hash_password) {
            if(err){
                reject(err)
            }
            resolve(hash_password)
        })
    });
}

const decrypt_password = (password,hash_password) =>{
    return new Promise((resolve,reject) =>{
        bcrypt.compare(password, hash_password, function(err, result) {
            if(err){
                reject(err)
            }
            resolve(result)
        });
    })
}


module.exports = {
    decrypt_password,
    encrypt_password,
}