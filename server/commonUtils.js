const crypto = require('crypto');

function commonUtils(){
    function generateSalt(){
        const salt = crypto.randomBytes(16).toString('hex');

        return salt;
    }

    function createHashPassword(password, salt){
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha1').toString('hex');

        return {
            salt: salt,
            hash: hash
        };
    }

    return {
        generateSalt: generateSalt,
        createHashPassword: createHashPassword
    }
}

module.exports.commonUtils = commonUtils();