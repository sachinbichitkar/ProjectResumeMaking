const data = require('../Config.json');
let dbparams = {
    host: "localhost",
    user: "root",
    password: "cdac",
    database: "MyBasicProject",
    port: 3306,
  };
  const mysql = require("mysql2");
  const connection = mysql.createConnection(dbparams);

  const bodyParser = require("body-parser");

  const express = require("express");
const { ok } = require("assert");
const { error } = require("console");
  const app = express();
  
  app.use(express.static("ClientSide"));
  //app.use(bodyParser.urlencoded({ extended: true }));
  var jsonParser = bodyParser.json();
  var urlencodedParser = bodyParser.urlencoded({ extended: false });


  app.listen(1080, function () {
    console.log("server listening at port 1080..."+data.ENV);
  });


  app.get("/hello", (req, resp) => {
    resp.send("Hello world");
  });

  app.post("/registerNewUser",urlencodedParser,(req,res)=>{
    var UserName=req.body.UserName;
    var Email=req.body.Email;
    var UserDob=req.body.UserDob;
    var UserType=1;
    var Password = Buffer.from(req.body.Password,'utf8').toString('base64');
    try{    
            connection.connect();
            connection.query('INSERT into User(UserName,UserEmail,UserDob,UserType,Password ) values(?,?,?,?,?);',[UserName,Email,UserDob,UserType,Password],(err,rows)=>{
                if(err){
                    console.log(err);
                    res.sendStatus(400);
                }
                else{ 
                        if(rows.affectedRows==1){
                            res.sendStatus(200);
                        }
                }
            });
        }catch(err){
            console.log(err.message)
        }finally{
           //connection.end();
        }  
});
  