const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const connection = require('express-myconnection');
const routes = require('./app/routes/customers');

app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(connection(mysql, {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    port: 3306,
    database: 'myCrm'
}, 'pool'));



app.get('/', routes.all);
app.post('/add', routes.add);
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', routes.edit_save);
app.delete('/delete/:id', routes.delete);

app.listen(3000, () => {
    console.log('Server at localhost:3000')
});