const db = require('./db').mongoConnection;
const commonUtils = require('./commonUtils').commonUtils;
const dataAccess = require('./dataAccess').dataAccess;
const authenticationCollection = 'authentication';

function authentication(){
    function register(req){
        return new Promise((resolve, reject) => {
            const username = req.body.username;
            const secureKey = commonUtils.createHashPassword(req.body.password, commonUtils.generateSalt());
            const paramsToFind = {
                'username': username
            };
            const paramsToInsert = {
                'username': username, 
                'hash': secureKey.hash, 
                'salt': secureKey.salt
            };

            dataAccess.findItem({'collection': authenticationCollection, 'obj': paramsToFind})
                .then(user => {
                    if(user){
                        return Promise.reject('User with this name already exists');
                    }

                    return Promise.resolve();
                })
                .then(() => {
                    dataAccess.insertItem({'collection': authenticationCollection, 'obj': paramsToInsert})
                        .then((res) => {
                            return resolve({err: null, success: true, message: 'Successfully created user'});
                        })
                })
                .catch(err => {
                    return reject(err);
                });
        });
    }

    function login(req, callback){
        return new Promise((resolve, reject) => {
            const {username, password} = req.body;
            const paramsToFind = {
                'username': username
            };

            dataAccess.findItem({'collection': authenticationCollection, 'obj': paramsToFind})
                .then(user => {
                    if(!user){
                        return Promise.reject('User not found');
                    }

                    const secureKey = commonUtils.createHashPassword(password, user.salt);
                    const userInfo = {
                        id: user._id,
                        username: user.username
                    }

                    if(user.username === username && user.hash === secureKey.hash){
                        return resolve({err: null, success: true, message: 'Successfully logged in', result: userInfo});
                    }
                    else{
                        return Promise.reject('Either username or password is incorrect');
                    }
                })
                .catch(err => {
                    return reject(err);
                });
                
            });
    }

    return {
        register: register,
        login: login
    }
}

module.exports.authentication = authentication();