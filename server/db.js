const mongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017/expenseApp';

function mongoConnection(){
    let state = {
        db: null
    };

    function connect(callback){
        return new Promise((resolve, reject) => {
            mongoClient.connect(url).then(db => {
                console.log('Connected to DB');
                state.db = db;
                resolve();
            }).catch(err => {
                console.log('error connection to database');
                reject(err);
            });
        });
    }

    function get(){
        return state.db;
    }

    function close(){
        if(state.db){
            state.db.close((err, res) => {
                state.db = null;
            });
        }
    }

    return {
        connect: connect,
        get: get,
        close: close
    }
}

module.exports.mongoConnection = mongoConnection();