
//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();


const conn = mysql.createConnection({
    host:'peliculadb3.c30hugurymyv.us-east-1.rds.amazonaws.com',
    user: 'sudosu',
    password : 'laboratorio26',
    database: 'peliculadb'
});

//connect to database
conn.connect((err) =>{
    if(err) throw err;
    console.log('Mysql Connected...');
  });
   
  //set views file
  app.set('views',path.join(__dirname,'views'));
  //set view engine
  app.set('view engine', 'hbs');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  //set public folder as static folder for static file
  app.use('/assets',express.static(__dirname + '/public'));
  var publicDir = require('path').join(__dirname,'/public');
  app.use(express.static(publicDir));
   
  //route for homepage
  app.get('/',(req, res) => {
    let sql = "SELECT * FROM pelicula";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.render('product_view',{
        results: results
      });
    });
  });
   
  //route for insert data
  app.post('/save',(req, res) => {
    let data = {nombre: req.body.nombre, genero: req.body.genero};
    let sql = "INSERT INTO pelicula SET ?";
    let query = conn.query(sql, data,(err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  });
   
  //route for update data
  app.post('/update',(req, res) => {
    let sql = "UPDATE pelicula SET nombre='"+req.body.nombre+"', genero='"+req.body.genero+"' WHERE id="+req.body.id;
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
      res.redirect('/');
    });
  });
   
  //route for delete data
  app.post('/delete',(req, res) => {
    let sql = "DELETE FROM peliculadb.pelicula WHERE id ="+req.body.id+"";
    let query = conn.query(sql, (err, results) => {
      if(err) throw err;
        res.redirect('/');
    });
  });
   
  //server listening
  app.listen(3000, () => {
    console.log('Server is running at port 3000');
  });