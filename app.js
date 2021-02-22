
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public")); // used to provide paths for static files

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us1.api.mailchimp.com/3.0/lists/79664efdc4";

  const options = {
    method: "POST",
    auth: "ashfaq:1da5ea6e5175f532c8921bf1b8ae0251-us1"
  }

  const request = https.request(url, options, function(response) {

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    response.on("data", function(data) {
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);

  request.end();

  console.log(firstName, lastName, email);

});


app.post("/failure", function(req, res) {
  res.redirect("/"); // the button click on the failure page triggers post method with failure route which is defined here
});


app.listen(process.env.PORT || 3000, function() { // Heroku port or local port 3000
  console.log("Server is running on port 3000");
});


// API Key
// 1da5ea6e5175f532c8921bf1b8ae0251-us1

// List ID
// 79664efdc4
