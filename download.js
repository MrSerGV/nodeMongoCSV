const MongoClient = require('mongodb').MongoClient;
const moment = require('moment');
const url = 'mongodb://localhost:27017/usercsv';
const json2csv = require('json2csv');

exports.get =  function (req, res) {

    var conversionMongotoCSV = function(db, callback) {
        
        const collection = db.collection('users');
        collection.find({}).toArray(function(err, users) {
          
          var fields = ['UserName','FirstName', 'LastName','Age'];
          var fieldNames = ['UserName','FirstName', 'LastName','Age'];
          console.log({ data: users});
          var data = json2csv({ data: users, fields: fields, fieldNames: fieldNames });
        
          const dateTime = moment().format('YYYYMMDDhhmmss');
          res.attachment('users'+ dateTime +'.csv');
          res.status(200).send(data);
          callback(users);
        });
    };

    MongoClient.connect(url, function(err, db) {
      console.log("Connected successfully to server");
      conversionMongotoCSV(db, function() {
        db.close();
      });
    });

}
