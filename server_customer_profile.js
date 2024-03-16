// const express = require("express");
// const app = express();
// const mysql2 = require("mysql2");
// const fileuploader = require("express-fileupload");
// var path = require("path");
// const { stat } = require("fs");

// app.listen(3000, function () {
//   console.log("helloooo");
// });

// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));

// app.get("/profile", function (req, resp) {
//   // resp.contentType("text/html");
//   // console.log("rarara");
//   let filepath = process.cwd() + "/public/customer_page/customer_profile.html";
//   // console.log(filepath);
//   resp.sendFile(filepath);
// });

// const configobj = {
//   host: "127.0.0.1",
//   user: "root",
//   password: "Saloni##2004",
//   database: "project",
// };
// const mysql = mysql2.createConnection(configobj);
// mysql.connect(function (err) {
//   if (err == null) {
//     console.log("connected to database");
//   } else {
//     console.log(err);
//   }
// });
// app.use(fileuploader());
// app.post("/form-register", function (req, resp) {
//   // create table profile_customerssss(emailid varchar(255) , pic varchar(255) , name varchar(255) , contact INT , state varchar(255) , city varchar(255) , address varchar(255));
//   // console.log(req.body);
//   const email = req.body.Email;
//   const name = req.body.Inputname;
//   // console.log(name);
//   const contact = req.body.Inputnum;
//   const state = req.body.State;
//   const City = req.body.city;
//   const address = req.body.address;
//   let filename;
//   // console.log(req.files);
//   if (req.files == null)
//     //when no pic selecetd
//     filename = "nopic.jpg";
//   //when pic is selected by user
//   else {
//     filename = req.files.ppic.name;
//     let path = process.cwd() + "/public/uploads/" + filename;
//     req.files.ppic.mv(path); //to store pic in uploads folder
//   }
//   req.body.ppic = filename;
//   mysql.query(
//     "insert into profile_customerssss values(?,?,?,?,?,?,?)",
//     [email ,filename, name, contact, state, City, address],
//     function (err) {
//       if (err == null) resp.send("Record Saved Successfullyyy");
//       else resp.send(err.message);
//     }
//   );
// });

// app.post("/update" , function(req , resp)
// {
//   const email = req.body.email;
//   const name = req.body.Inputname;
//   const contact = req.body.Inputnum;
//   const state = req.body.State;
//   const city = req.body.city;
//   const address = req.body.address;
//   let filename;
//     if(req.files==null)//when no pic selecetd
//         filename="nopic.jpg";
//     else//when pic is selected by user
//        {
//         filename=req.files.ppic.name;
//         let path=process.cwd()+"/public/uploads/"+filename;
//         req.files.ppic.mv(path);//to store pic in uploads folder
//        }

//        req.body.ppic=filename;
//        mysql.query("update profile_customerssss set pic=? ,name=? , contact=? ,state=? , city=? ,address=?  where emailid=?" , [filename , name , contact,state,city,address,email],function(err)
//        {
//         if(err==null)
//         {
//           resp.send("record updated suucessfully");
//         }
//         else
//         {
//           resp.send(err);
//         }
//        })
// })
// app.post("/fetch-one",function(req,resp)
// {
//     mysql.query("select * from profile_customerssss where emailid=?",[req.body.kuchMail],function(err,resultJsonAry){
//       // console.log(req.body);
//             resp.send(resultJsonAry);
//     })
// })
