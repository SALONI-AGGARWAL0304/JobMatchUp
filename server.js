const express = require("express");
const app = express();
const mysql2 = require("mysql2");
const fileuploader = require("express-fileupload");
const nodemailer = require("nodemailer");
const { stat } = require("fs");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saloni3aggarwal123@gmail.com", // Replace with your Gmail email
    pass: "renb zadv puoq xgcz", // Replace with your Gmail password
  },
});
app.use(express.static("public"));
app.use(fileuploader());
app.use(express.urlencoded({ extended: true }));
app.listen(3000, function () {
  console.log("yayyy");
});
app.get("/", function (req, resp) {
  resp.contentType("text/html");
  let path = process.cwd() + "/public/index.html";
  resp.sendFile(path);
});
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
// create table users1(emailid varchar(255) , pwd varchar(255) , utype varchar(255) , dos date , status int);
app.get("/signup-collector", function (req, resp) {
  console.log(req.query);
  let email = req.query.email;
  let pass = req.query.pwd;
  let user = req.query.usertype;
  mysql.query(
    "insert into users2 values(?,?,?,current_date(),1)",
    [email, pass, user],
    function (err) {
      if (err == null) {
        resp.send("Sign Up successfully");
        const mailOptions = {
          from: "saloniaggarwalofficial339@gmail.com", // Replace with your Gmail email
          to: email,
          subject: "Signup Confirmation",
          text: "Thank you for signing up!",
        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error(error);
            return resp.status(500).send("Error sending confirmation email");
          } else {
            console.log(info.response);
          }
        });
      } else {
        console.error(err);
        resp.status(500).send(err.message);
      }
    }
  );
});

app.get("/check-email", function (req, resp) {
  let email = req.query.kuchEmail;
  mysql.query(
    "select *from users2 where emailid=?",
    [email],
    function (err, resultJsonAry) {
      if (resultJsonAry.length == 1) {
        resp.send("Not Available");
      } else {
        resp.send("Available");
      }
    }
  );
});
app.get("/login-collector", function (req, resp) {
  const Email = req.query.email;
  const pass = req.query.pwd;
  mysql.query(
    "select *from users2 where emailid=? and pwd=?",
    [Email, pass],
    function (err, resultJSONAry) {
      if (err) {
        resp.send(err.message);
      } else {
        if (resultJSONAry.length == 1) {
          if (resultJSONAry[0].status == 1) {
            const usertype = resultJSONAry[0].utype;
            resp.send(usertype);
          } else {
            resp.send("ur account is blocked ! contact admin");
          }
        } else {
          resp.send("invalid username or password");
        }
      }
    }
  );
});

// customer dash page server code
app.post("/postjobs", function (req, resp) {
  const email = req.body.postmail;
  const typework = req.body.postwork;
  const address = req.body.postaddress;
  const city = req.body.postcity;
  const date = req.body.postupto;
  const workdone = req.body.postdone;
  mysql.query(
    "insert into tasks values(0,?,?,?,?,?,?)",
    [email, typework, address, city, date, workdone],
    function (err) {
      if (err == null) {
        resp.send("data saved successfully");
      } else {
        resp.send(err.message);
      }
    }
  );
});
app.post("/fetch-address", function (req, resp) {
  const mail = req.body.radiomail;
  mysql.query(
    "select * from profile_customerssss where emailid=?",
    [mail],
    function (err, resultary) {
      resp.send(resultary);
    }
  );
});
app.post("/settings_customer", function (req, resp) {
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
                resp.send(err.message);
              }
            }
          );
        }
      } else {
        resp.send(err.message);
      }
    }
  );
});
app.get("/customer_manager", function (req, resp) {
  let filepath =
    process.cwd() + "/public/customer_page/customer_job_manager.html";
  resp.sendFile(filepath);
});
app.get("/customer-task", function (req, resp) {
  mysql.query("select *from tasks", function (err, resultcustomer) {
    if (err == null) {
      resp.send(resultcustomer);
    } else {
      console.log(err.message);
    }
  });
});
app.get("/customer-delete", function (req, resp) {
  const rid = req.query.ridkuch;
  mysql.query("delete from tasks where rid=?", [rid], function (err, result) {
    if (err == null) {
      if (result.affectedRows == 1) resp.send("Record Deleted Successfullyyy");
      else resp.send("Inavlid ID");
    } else resp.send(err.message);
  });
});

app.get("/searchprofile", function (req, resp) {
  let filepath = process.cwd() + "/public/customer_page/customer_search.html";
  resp.sendFile(filepath);
});

app.get("/fetch-one-record", function (req, resp) {
  mysql.query(
    "select * from providers where location=? and category=?",
    [req.query.city, req.query.job],
    function (err, resultJsonAry) {
      if (resultJsonAry.length === 0) {
        console.log("No records founf");
      } else {
        console.log(resultJsonAry);
        resp.send(resultJsonAry);
      }
    }
  );
});
app.get("/angular-fetch-distinct-loc", function (req, resp) {
  mysql.query(
    "select distinct location from providers",
    function (err, resultcity) {
      if (err == null) {
        console.log(resultcity);
        resp.send(resultcity);
      } else {
        console.log(err);
      }
    }
  );
});
app.get("/angular-fetch-distinct-category", function (req, resp) {
  mysql.query(
    "select distinct category from providers",
    function (err, resultcategory) {
      if (err == null) {
        console.log(resultcategory);
        resp.send(resultcategory);
      } else {
        console.log(err);
      }
    }
  );
});
// server customer dash ends here
// customer profile starts here
app.post("/form-register", function (req, resp) {
  // create table profile_customerssss(emailid varchar(255) , pic varchar(255) , name varchar(255) , contact INT , state varchar(255) , city varchar(255) , address varchar(255));
  // console.log(req.body);
  const email = req.body.email;

  const name = req.body.Inputname;
  // console.log(name);
  const contact = req.body.Inputnum;
  const state = req.body.State;
  const City = req.body.city;
  const address = req.body.address;
  let filename;
  // console.log(req.files);
  if (req.files == null)
    //when no pic selecetd
    filename = "nopic.jpg";
  //when pic is selected by user
  else {
    filename = req.files.ppic.name;
    let path = process.cwd() + "/public/uploads/" + filename;
    req.files.ppic.mv(path); //to store pic in uploads folder
  }
  req.body.ppic = filename;
  mysql.query(
    "insert into profile_customerssss values(?,?,?,?,?,?,?)",
    [email, filename, name, contact, state, City, address],
    function (err) {
      if (err == null) resp.send("Record Saved Successfullyyy");
      else resp.send(err.message);
    }
  );
});

app.post("/update", function (req, resp) {
  const email = req.body.email;
  const name = req.body.Inputname;
  const contact = req.body.Inputnum;
  const state = req.body.State;
  const city = req.body.city;
  const address = req.body.address;
  let filename;
  if (req.files == null)
    //when no pic selecetd
    filename = "nopic.jpg";
  //when pic is selected by user
  else {
    filename = req.files.ppic.name;
    let path = process.cwd() + "/public/uploads/" + filename;
    req.files.ppic.mv(path); //to store pic in uploads folder
  }

  req.body.ppic = filename;
  mysql.query(
    "update profile_customerssss set pic=? ,name=? , contact=? ,state=? , city=? ,address=?  where emailid=?",
    [filename, name, contact, state, city, address, email],
    function (err) {
      if (err == null) {
        resp.send("record updated suucessfully");
      } else {
        resp.send(err);
      }
    }
  );
});
app.post("/fetch-one", function (req, resp) {
  mysql.query(
    "select * from profile_customerssss where emailid=?",
    [req.body.kuchMail],
    function (err, resultJsonAry) {
      // console.log(req.body);
      resp.send(resultJsonAry);
    }
  );
});
// customer profile ends here
// service server starts here
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
app.post("/fetch-ones", function (req, resp) {
  mysql.query(
    "select * from providers where emailid=?",
    [req.body.servicemail],
    function (err, resultJsonAry) {
      if(err==null)
     { console.log(req.body);
      resp.send(resultJsonAry);}
      else
      {
        console.log(err.message);
      }
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
// service server ends here
// admin server page sarts here
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
app.get("/provided-customers-data", function (req, resp) {
  mysql.query("select *from profile_customerssss", function (err, resultary) {
    if (err == null) {
      resp.send(resultary);
    } else {
      console.log(err.message);
    }
  });
});
// admin server page ends here
