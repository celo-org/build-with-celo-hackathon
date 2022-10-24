const mongo = require('mongodb').MongoClient;
const CryptoJS = require('crypto-js');

const url = 'mongodb://localhost:27017'
const dbName = 'celodb'


mongo.connect(url, (err, client) => {
    if (err) {
        console.error(err)
        return
    }
    console.log('Connected successfully to server')
    const db = client.db(dbName)
    const collection = db.collection('collectionname')

    // collection.insertOne({
    //     Number: '+2348057922485',
    //     PrivateKey: 'U2FsdGVkX19kO0VjT9ncXPDrYT//X4jCONlklW9okVVkH+4gpGRsjFrn06CjUV1mBfArp5PbrF6ySDxD8WD9ZR/oN9Vdw2WY3FgoqTAaJdc0zSThjpb6NqOTNKXGcKpA'
    // }, ((error, item) => {
    //     if (error) {
    //         console.error(error)
    //         return
    //     }
    //     console.log(item)
    // }))

    // collection.insertMany([{ name: 'Test', age: '30' }, { name: 'Test2', age: '60' }], (error, result) => {

    // })

    // collection.deleteOne({ Number: '+2348057922485' }, (error, item) => {
    //     console.log(item)
    // })

    collection.find().toArray((error, items) => {
        console.log(items)
    })
})

// mongo.connect(url, (err, client) => {
//     if (err) {
//         console.error(err)
//         return
//     }
//     console.log('Connected successfully to server')
//     const db = client.db(dbName)
//     const collection = db.collection('collectionname')

//     collection.find({ Number: '+2348057922485' }).toArray((error, items) => {
//         console.log(items)
//         // const bytes = CryptoJS.AES.decrypt(items[0].PrivateKey, '1234');
//         // const privateKey = bytes.toString(CryptoJS.enc.Utf8)
//         // console.log('privateKey', privateKey)

//     })
// })
