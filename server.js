// Sets the node.js server to work on port 8080

if (!process.env.PORT) {
	process.env.PORT = 8080;
}

// Library definitions

var express = require('express');
var streznik = express();
var http = require('http');
var bodyParser = require('body-parser');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');

streznik.use(bodyParser.urlencoded({ extended: true }));

// Initialization of variables that will store the HTML to be served later when plotting. [Indeed, we improvised]
// The time we had was limited, so we couldn't configure rendering with templates.

var plotHtmlPrej = "";
var ehrId = "";
var plotHtmlPotem1 = "", plotHtmlPotem2 = "";

streznik.use(express.static('public'));

// Reading templates from HTML files.
// All the necesarry parameters get passed inbetween the code via concatenation later.

fs.readFile('do_parametra.html', 'utf8', function (err,data) {
  plotHtmlPrej = data;
});

fs.readFile('po_parametru1.html', 'utf8', function (err,data) {
  plotHtmlPotem1 = data;
});

fs.readFile('po_parametru2.html', 'utf8', function (err,data) {
  plotHtmlPotem2 = data;
});

// Attention, very secure stuff (just for demonstration purposes).

var passwordi = ["medrockweek1", "record>ostali"];

function isValidPass(pass, passwords) {
    for (var i = 0; i < passwords.length; i++) {
        if (passwords[i] == pass) return true;
    }
    return false;
}

// When a password is entered, the parameters get passed into the HTML code
// and everything then connects, and posts back to the browser.

streznik.post('/plot', function(req, res) {

    ehrId = req.body.lg_patientid;
    pass = req.body.lg_password;

    if (isValidPass(pass, passwordi)) {
				// Connects the html with parameters (didn't have the time to configure .ejs rendering or anything similar).
        res.send(plotHtmlPrej + ehrId + plotHtmlPotem1 + ehrId + plotHtmlPotem2);
    } else {
        res.send("Your password is not correct.");
    }
});

// Console log to show where and if the server started.

streznik.listen(process.env.PORT, function() {
  console.log("Strežnik posluša na portu " + process.env.PORT + ".");
});
