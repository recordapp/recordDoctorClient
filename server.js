if (!process.env.PORT) {
	process.env.PORT = 8080;
}

var express = require('express');
var streznik = express();
var http = require('http');
var bodyParser = require('body-parser');
var fs  = require('fs');
var path = require('path');
var mime = require('mime');
var predpomnilnik = {};

// Streznik napisan vecidel na predavanjih doc. dr. Dejana Lavbica na FRI UNI-LJ, 2016

streznik.use(bodyParser.urlencoded({ extended: true })); 

function posredujNapako404(odgovor) {
	odgovor.writeHead(404, {'Content-Type': 'text/plain'});
	odgovor.write('Napaka 404: Vira ni mogoče najti.');
	odgovor.end();
}

function posredujDatoteko(odgovor, datotekaPot, datotekaVsebina) {
	odgovor.writeHead(200, {"content-type": mime.lookup(path.basename(datotekaPot))});
	odgovor.end(datotekaVsebina);
}

function posredujStaticnoVsebino(odgovor, predpomnilnik, absolutnaPotDoDatoteke) {
	if (predpomnilnik[absolutnaPotDoDatoteke]) {
		posredujDatoteko(odgovor, absolutnaPotDoDatoteke, predpomnilnik[absolutnaPotDoDatoteke]);
	} else {
		fs.exists(absolutnaPotDoDatoteke, function(datotekaObstaja) {
			if (datotekaObstaja) {
				fs.readFile(absolutnaPotDoDatoteke, function(napaka, datotekaVsebina) {
					if (napaka) {
						posredujNapako404(odgovor);
					} else {
						predpomnilnik[absolutnaPotDoDatoteke] = datotekaVsebina;
						posredujDatoteko(odgovor, absolutnaPotDoDatoteke, datotekaVsebina);
					}
				});
			} else {
				posredujNapako404(odgovor);
			}
		});
	}
}

var plotHtmlPrej = "";
var ehrId = "";
var plotHtmlPotem = "";

streznik.use(express.static('public'));

fs.readFile('do_parametra.html', 'utf8', function (err,data) {
  plotHtmlPrej = data;
});

fs.readFile('po_parametru.html', 'utf8', function (err,data) {
  plotHtmlPotem = data;
});

// attention, very secure stuff (just for demo tho)
var passwordi = ["medrockweek1", "record>ostali"];

function isValidPass(pass, passwords) {
    for (var i = 0; i < passwords.length; i++) {
        if (passwords[i] == pass) return true;
    }
    return false;
}

streznik.post('/plot', function(req, res) {

    ehrId = req.body.lg_patientid;
    pass = req.body.lg_password;
    
    if (isValidPass(pass, passwordi)) {     
        res.send(plotHtmlPrej + ehrId + plotHtmlPotem);
    } else {
        
        res.send("Your password ( "+pass+" ) is not correct.");
    }

    // res.send('You sent the name "' + req.body.lg_patientid + '".');
});

// Console log za potrditev starta serverja

streznik.listen(process.env.PORT, function() {
  console.log("Strežnik posluša na portu " + process.env.PORT + ".");
});

var plot = ""
