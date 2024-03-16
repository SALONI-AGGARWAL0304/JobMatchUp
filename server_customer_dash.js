// const express = require("express");
// const app = express();
// const mysql2 = require("mysql2");
// const fileuploader = require("express-fileupload");
// const e = require("express");
// const { errorMonitor } = require("nodemailer/lib/xoauth2");
// app.listen(3001, function () {
//   console.log("helloooo");
// });
// app.get("/dash", function (req, resp) {
//   let filepath = process.cwd() + "/public/customer_page/customer_dash.html";
//   resp.sendFile(filepath);
// });
// app.use(express.static("public"));
// app.use(express.urlencoded({ extended: true }));
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
// // create table tasks(rid int primary key auto_increment  , emailid varchar(255) , category varchar(255) , address varchar(255) , city varchar(255) , upto date , task varchar(255));
// app.post("/postjobs", function (req, resp) {
//   const email = req.body.postmail;
//   const typework = req.body.postwork;
//   const address = req.body.postaddress;
//   const city = req.body.postcity;
//   const date = req.body.postupto;
//   const workdone = req.body.postdone;
//   mysql.query(
//     "insert into tasks values(0,?,?,?,?,?,?)",
//     [email, typework, address, city, date, workdone],
//     function (err) {
//       if (err == null) {
//         resp.send("data saved successfully");
//       } else {
//         resp.send(err.message);
//       }
//     }
//   );
// });
// app.post("/fetch-address", function (req, resp) {
//   const mail = req.body.radiomail;
//   mysql.query(
//     "select * from profile_customerssss where emailid=?",
//     [mail],
//     function (err, resultary) {
//       resp.send(resultary);
//     }
//   );
// });
// app.post("/settings_customer", function (req, resp) {
//   const email = req.body.changemail;
//   const oldpass = req.body.changeoldpass;
//   const newpass = req.body.changenewpass;
//   mysql.query(
//     "select *from users2 where emailid=?",
//     [email],
//     function (err, resultary) {
//       if (err == null) {
//         // resp.send(resultary);
//         const pass = resultary[0].pwd;
//         if (pass != oldpass) {
//           resp.send("your old password is not correct");
//         } else {
//           mysql.query(
//             "update users2 set pwd =? where emailid=?",
//             [newpass, email],
//             function (err, result) {
//               if (err == null) {
//                 resp.send("record updated");
//               } else {
//                 resp.send(err.message);
//               }
//             }
//           );
//         }
//       } else {
//         resp.send(err.message);
//       }
//     }
//   );
// });
// app.get("/customer_manager", function (req, resp) {
//   let filepath =
//     process.cwd() + "/public/customer_page/customer_job_manager.html";
//   resp.sendFile(filepath);
// });
// app.get("/customer-task", function (req, resp) {
//   mysql.query("select *from tasks", function (err, resultcustomer) {
//     if (err == null) {
//       resp.send(resultcustomer);
//     } else {
//       console.log(err.message);
//     }
//   });
// });
// app.get("/customer-delete", function (req, resp) {
//   const rid = req.query.ridkuch;
//   mysql.query("delete from tasks where rid=?", [rid], function (err, result) {
//     if (err == null) {
//       if (result.affectedRows == 1) resp.send("Record Deleted Successfullyyy");
//       else resp.send("Inavlid ID");
//     } else resp.send(err.message);
//   });
// });

// app.get("/searchprofile", function (req, resp) {
//   let filepath = process.cwd() + "/public/customer_page/customer_search.html";
//   resp.sendFile(filepath);
// });

// app.get("/fetch-one-record", function (req, resp) {
//   mysql.query(
//     "select * from providers where location=? and category=?",
//     [req.query.city, req.query.job],
//     function (err, resultJsonAry) {
//       if (resultJsonAry.length === 0) {
//         console.lo("No records founf");
//       } else {
//         console.log(resultJsonAry);
//         resp.send(resultJsonAry);
//       }
//     }
//   );
// });
// app.get("/angular-fetch-distinct-loc", function (req, resp) {
//   mysql.query(
//     "select distinct location from providers",
//     function (err, resultcity) {
//       if (err == null) {
//         console.log(resultcity);
//         resp.send(resultcity);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });
// app.get("/angular-fetch-distinct-category", function (req, resp) {
//   mysql.query(
//     "select distinct category from providers",
//     function (err, resultcategory) {
//       if (err == null) {
//         console.log(resultcategory);
//         resp.send(resultcategory);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });
