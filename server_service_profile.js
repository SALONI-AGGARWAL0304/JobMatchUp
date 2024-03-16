const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const fileuploader = require("express-fileupload");
const e = require("express");
app.listen(3001, function () {
  console.log("helloooo");
});
app.get("/serviceprofile", function (req, resp) {
  let filepath =
    process.cwd() + "/public/service_provider_page/service_profile.html";
  resp.sendFile(filepath);
});
app.get("/servicedash", function (req, resp) {
  let filepath =
    process.cwd() + "/public/service_provider_page/server_dash.html";
  resp.sendFile(filepath);
});
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
const configobj = {
  host: "127.0.0.1",
  user: "root",
  password: "Saloni##2004",
  database: "project",
};
const mysql = mysql2.createConnection(configobj);
mysql.connect(function (err) {
  if (err == null) {
    console.log("connected to database");
  } else {
    console.log(err);
  }
});
app.use(fileuploader());
app.post("/service_form-register", function (req, resp) {
  // create table providers(emailid varchar(255) primary key , name varchar(255) , gender varchar(255) , contact varchar(255) , category varchar(255) ,
  // firm varchar(255) , website varchar(255) , location varchar(255) , since INT , proofpic varchar(255) , otherinfo varchar(255) );
  const email = req.body.emails;
  const name = req.body.Inputname;
  const number = req.body.Inputnum;
  const gender = req.body.gender;
  const category = req.body.taskcategory;
  const firm = req.body.firm;
  const website = req.body.website;
  const location = req.body.address;
  const expierence = req.body.tasksince;
  const previous = req.body.previouswork;
  let filename;
  // console.log(req.files);
  if (req.files == null)
    //when no pic selecetd
    filename = "nopic.jpg";
  //when pic is selected by user
  else {
    filename = req.files.serviceid.name;
    let path = process.cwd() + "/public/uploads/" + filename;
    req.files.serviceid.mv(path); //to store pic in uploads folder
  }
  req.body.serviceid = filename;
  mysql.query(
    "insert into providers values(?,?,?,?,?,?,?,?,?,?,?)",
    [
      email,
      name,
      gender,
      number,
      category,
      firm,
      website,
      location,
      expierence,
      filename,
      previous,
    ],
    function (err) {
      if (err == null) {
        resp.send("Record saved successfully");
      } else {
        resp.send(err);
      }
    }
  );
});
app.post("/update", function (req, resp) {
  const email = req.body.emails;
  const name = req.body.Inputname;
  const number = req.body.Inputnum;
  const gender = req.body.gender;
  const category = req.body.taskcategory;
  const firm = req.body.firm;
  const website = req.body.website;
  const location = req.body.address;
  const expierence = req.body.tasksince;
  const previous = req.body.previouswork;
  let filename;
  if (req.files == null)
    //when no pic selecetd
    filename = "nopic.jpg";
  //when pic is selected by user
  else {
    filename = req.files.serviceid.name;
    let path = process.cwd() + "/public/uploads/" + filename;
    req.files.serviceid.mv(path); //to store pic in uploads folder
  }

  req.body.serviceid = filename;
  mysql.query(
    "update providers set name = ? , gender =? , contact=? , category =? , firm=? , website =? , location=? , since =? , proofpic= ? ,otherinfo =? where emailid =?",
    [
      name,
      gender,
      number,
      category,
      firm,
      website,
      location,
      expierence,
      filename,
      previous,
      email,
    ],
    function (err) {
      if (err == null) {
        resp.send("Record updates successfully");
      } else {
        resp.send(err);
      }
    }
  );
});
app.post("/fetch-one", function (req, resp) {
  mysql.query(
    "select * from providers where emailid=?",
    [req.body.servicemail],
    function (err, resultJsonAry) {
      // console.log(req.body);
      resp.send(resultJsonAry);
    }
  );
});
app.post("/setting-service", function (req, resp) {
  const email = req.body.changemail;
  const oldpass = req.body.changeoldpass;
  const newpass = req.body.changenewpass;
  mysql.query(
    "select *from users2 where emailid=?",
    [email],
    function (err, resultary) {
      if (err == null) {
        // resp.send(resultary);
        const pass = resultary[0].pwd;
        if (pass != oldpass) {
          resp.send("your old password is not correct");
        } else {
          mysql.query(
            "update users2 set pwd =? where emailid=?",
            [newpass, email],
            function (err, result) {
              if (err == null) {
                resp.send("record updated");
              } else {
                console.log(err.message);
                // resp.send(err.message);
              }
            }
          );
        }
      } else {
        console.log(err.message);
        // resp.send(err.message);
      }
    }
  );
});
