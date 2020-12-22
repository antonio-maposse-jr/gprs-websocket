# gprs-websocket
GPRS Websocket for model TK102


This project is a Websocket to listen to events that the GPS of vehicles send to the server and to register the information in a MySQL database.
To use this library it is necessary to have a database with a vehicle table with the following columns:

1- 	imei:	varchar(255)
2- 	latitude: varchar(30)
3- 	longitude: varchar(30) 
4- 	direction: double
5- 	speed: double
6- 	status: int


After that in the devices.js file, just configure the connection to the database and run the script in Node JS.
