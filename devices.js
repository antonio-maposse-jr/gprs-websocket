var gpstracker = require("gpstracker");
const fs = require('fs');

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your password",
    database: "your database"
});


var server = gpstracker.create().listen(7000, function(){
    console.log('listening your gps trackers on port', 7000 );

});

server.trackers.on("connected", function(tracker){

    console.log("tracker connected with imei:", tracker.imei);

    tracker.on("help me", function(){
        console.log(tracker.imei + " Alarm ".red);
    });

    tracker.on("position", function(position){
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

        console.log(position.mensagem)

        let update = {
            imei: tracker.imei,
            lat: position.lat,
            lng: position.lng,
            orientation: parseFloat(position.orientation) || 0,
            speed: parseFloat(position.speed) || 0,
            engine: 1,
            time: 0,
            gps_time: dateTime.toString()
        }

        updatelocations(update, function (result) {
            // console.log("Sucess");
        });
    });

    tracker.trackEvery(10).seconds();
});

function getFormattedDate() {
    var date = new Date();

    var str =  (date.getMonth() + 1) + "-" + date.getDate() + "-" + date.getFullYear()+ " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    return str;
}

function updatelocations(data, callback) {

    var sql= "UPDATE buses SET latitude="+data.lat+", longitude="+data.lng+" , direction="+data.orientation+", speed="+data.speed+", status="+data.engine+", time="+data.time+" ,gps_date="+'\''+data.gps_time+'\'' +" WHERE imei="+'\''+data.imei+'\''+ "";
    // console.log(sql);

    var timeMil = getFormattedDate();
    const line = data.imei+"$"+data.lat+"$"+data.lng+"$"+data.speed+"$"+1+"$"+timeMil+"$"+data.orientation;
    fs.appendFile("/var/www/devices-log/locations.txt", line+"\n", function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("The file was saved!");
    });

    con.query(sql, function (err, result, fields) {
        if (err) {
            throw err;
        }
        callback(result)
    });
}