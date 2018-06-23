const db = require('./db').mongoConnection;

function dataAccess(){

    function getItem(params){
        return new Promise((resolve, reject) => {
            const {collection, obj} = params;

            db.get().collection(collection).find(obj).toArray((err, data) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(data);
                }
            });
        });
    }

    function findItem(params){
        return new Promise((resolve, reject) => {
            const {collection, obj} = params;

            db.get().collection(collection).findOne(obj).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }

    function insertItem(params){
        return new Promise((resolve, reject) => {
            const {collection, obj} = params;

            db.get().collection(collection).insertOne(obj).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        });
    }

    function updateItem(params){
        return new Promise((resolve, reject) => {
            const {collection, query, obj} = params;

            db.get().collection(collection).updateOne(query, obj).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            })
        })
    }

    return{
        getItem: getItem,
        findItem: findItem,
        insertItem: insertItem,
        updateItem: updateItem
    }
}

module.exports.dataAccess = dataAccess();