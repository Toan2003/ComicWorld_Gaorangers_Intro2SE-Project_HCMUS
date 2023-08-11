const mongodb = require('mongodb')

const url = 'mongodb://localhost:8080'

const client = new mongodb.MongoClient(url)

const dbName = 'comicsWorld'

async function connectToDB() {
    result = false
    await client.connect().catch(err =>{
        console.log(err)
        return result
    })
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('documents');
  
    return 'done.';
}