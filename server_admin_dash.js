const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const fileuploader = require("express-fileupload");
app.listen(3000, function () {
  console.log("helloooo");
});
app.get("/admin", function (req, resp) {
  let filepath = process.cwd() + "/public/admin page/admin_dash.html";
  resp.sendFile(filepath);
});
app.get("/users", function (req, resp) {
  let filepath = process.cwd() + "/public/admin page/user_managers.html";
  resp.sendFile(filepath);
});
app.get("/providers", function (req, resp) {
  let filepath = process.cwd() + "/public/admin page/all_providers.html";
  resp.sendFile(filepath);
});
app.get("/customers", function(req , resp)
{
  let filepath = process.cwd() + "/public/admin page/all_customers.html";
  resp.sendFile(filepath);
})
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
app.get("/fetch_users_signup", function (req, resp) {
  mysql.query("select *from users2", function (err, resultary) {
    if (err == null) {
      resp.send(resultary);
        console.log(resultary);
    } else {
      console.log(err.message);
    }
  });
});
app.get("/block-user", function (req, resp) {
  const email = req.query.usermail;
  mysql.query(
    "update users2 set status = ? where emailid=?",
    [0, email],
    function (err) {
      if (err == null) {
        resp.send("updated successfully");
      } else {
        resp.send(err);
      }
    }
  );
});
app.get("/resume-user", function (req, resp) {
  const email = req.query.usermail;
  mysql.query(
    "update users2 set status = ? where emailid=?",
    [1, email],
    function (err) {
      if (err == null) {
        resp.send("updated successfully");
      } else {
        resp.send(err);
      }
    }
  );
});
app.get("/provided-data", function (req, resp) {
  mysql.query("select *from providers", function (err, resultary) {
    if (err == null) {
      resp.send(resultary);
    } else {
      console.log(err.message);
    }
  });
});
app.get("/provided-customers-data" , function(req , resp)
{
  mysql.query("select *from profile_customerssss", function (err, resultary) {
    if (err == null) {
      resp.send(resultary);
    } else {
      console.log(err.message);
    }
  });
})
