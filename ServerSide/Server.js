const data = require('../Config.json');

const mysql = require("mysql2");
const connection = mysql.createConnection(data.dbparams);

const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const { ok } = require("assert");
const { error } = require("console");
const app = express();

//app.use(cors());
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
                            res.redirect(data.BaseUrl+'Login.html');
                        }
                }
            });
        }catch(err){
            console.log(err.message)
        }finally{
           //connection.end();
        }  
 });

app.post("/userLogin",urlencodedParser,(req,res)=>{
  //console.log(req.body);
  var Email=req.body.Email;
  var Password = Buffer.from(req.body.Password,'utf8').toString('base64');
  try{    
    connection.connect();
    connection.query('SELECT * from User where UserEmail = ? ;',[Email],(err,rows,fields)=>{
        if(err){
            console.log(err);
            //res.sendStatus(400);
            res.redirect(data.BaseUrl+'Login.html');
        }
        else{ 
              if(rows.length === 1 ){
                //res.sendStatus(400);
                if(rows[0].Password === Password){
                  //res.sendStatus(200);
                  res.redirect(data.BaseUrl+'Index.html');
                }else{
                  //res.sendStatus(404);
                  res.redirect(data.BaseUrl+'Login.html');
                }
              }
              else{
                console.log('No rec fund');
                res.send(404);
              }
        }
    });
}catch(err){
    console.log(err.message)
}finally{
   //connection.end();
}  

});

app.get("/getEmail",cors(),(req,res)=>{
    var email=req.query.Email;
    try{    
      connection.connect();
      connection.query('SELECT * from User where UserEmail = ? ;',[email],(err,rows,fields)=>{
          if(err){
              console.log(err);
              res.sendStatus(400);
          }
          else{ var output={ result : "" }
                  if(rows.length === 0 ){
                    output.result="OK";
                  }else if(rows.length === 1){
                    output.result="Email already present " + rows[0].UserEmail;
                  }
                  console.log(output);
                  res.send(output);
          }
      });
  }catch(err){
      console.log(err.message)
  }finally{
    //connection.end();
  }  
});