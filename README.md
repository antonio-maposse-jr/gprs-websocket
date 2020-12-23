# gprs-websocket
GPRS Websocket for model TK102


This project is a Websocket to listen to events that the GPS of vehicles send to the server and to register the information in a MySQL database.
To use this library it is necessary to have a database with a vehicle table with the following columns:

* 	imei:	varchar(255)
*	latitude: varchar(30)
* 	longitude: varchar(30) 
*	direction: double
*	speed: double
*	status: int


After that in the devices.js file, just configure the connection to the database and run the script in Node JS.

Supported Models
================
This Websockets works for the following models of GPRS devices:
* TK102/TK102B 
* TK103/TK103B 
* TK104
* TK106/TK106B

Usage
=====

A very basic example will be this

```javascript
var gpstracker = require("gpstracker");
var server = gpstracker.create().listen(8000, function(){
    console.log('listening your gps trackers on port', 8000);
});

server.trackers.on("connected", function(tracker){
    
    console.log("tracker connected with imei:", tracker.imei);
    
    tracker.on("help me", function(){
        console.log(tracker.imei + " pressed the help button!!".red);
    });

	tracker.on("position", function(position){
        console.log("tracker {" + tracker.imei +  "}: lat", 
                            position.lat, "lng", position.lng);
    });

    tracker.trackEvery(10).seconds();
});
```
