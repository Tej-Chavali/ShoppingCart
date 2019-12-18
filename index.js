var express = require('express');
var bodyparser = require('body-parser');
var app = express();
var sql = require('mssql');
var configFile = require('./config');
var cors = require('cors');
var port = process.env.port || 6800;
var data = [];
app.listen(port, err => {
    if (err) console.log('err');
    else {
        console.log(`Running Port is ${port}`);
    }
});
app.use(bodyparser.json());
app.use(cors());
var config = configFile;
sql.connect(config, function (err) {
    if (err) {
        console.log('err');
    }
});
let checkKey = [],
    keyValue = ''

var request = new sql.Request();
app.get('/', (req, res) => {
    // console.log(req.query.id);
    var sqlQuery = "select * from ProductMaster";
    request.query(sqlQuery, function (err, recordset) {
        if (err) console.log('err');
        // console.log(recordset.recordsets[0])
        data = recordset.recordsets[0];
        data.map(productDetails => {
            for (keyValue in productDetails) {
                checkKey.push(keyValue)
            }
            if (checkKey.includes('product_default')) {

            }
            else {
                productDetails.product_default = 1;
            }
        })
        console.log(data);
        res.send(data);
    });
});

