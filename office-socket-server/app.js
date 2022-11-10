const express = require('express');
require('dotenv').config()

const fs = require('fs');
// Local Modules

// Server Initialization
const app = express();
const PORT = process.env.PORT;

const http = require('http');
const https = require('https');
const SERVER_KEY = fs.readFileSync('certs/server.key', 'utf8');
const SERVER_CRT = fs.readFileSync('certs/server.crt', 'utf8');
const credentials = {key: SERVER_KEY, cert: SERVER_CRT};


const server = https.createServer(credentials, app);

const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
	logLevel: logLevel.DEBUG,
	brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
	clientId: 'command-producer',
});

const TOPIC = 'commands';
let producer = kafka.producer();

const sendCommand = (command) => {
	return producer
		.send({
			topic: TOPIC,
			messages: command,
		})
		.then(console.log)
		.catch(e => console.error(`[command_producer] ${e.message}`, e));
};


const io = require('socket.io')(server, {
	cors: {
		origin: "*",
		credentials: true,
		methods: ["GET", "POST"],
		transports: ['websocket', 'polling'],
	},
	allowEIO3: true
});


const jwt = require("jsonwebtoken");
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const { Emitter } = require('@socket.io/redis-emitter');


const pub_client = createClient({
	legacyMode: true,
	url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
});

pub_client.on('error', (err) => {
	console.log(err.message);
});

const sub_client = pub_client.duplicate();

sub_client.on('error', (err) => {
	console.log(err.message);
});

const emitter = new Emitter(pub_client);

io.adapter(createAdapter(pub_client, sub_client));

function checkAuthToken(token, callback) {
	const cert = fs.readFileSync(process.env.RSA_PRIVATE_KEY);  // get public key
	jwt.verify(token, cert, { algorithms: ['RS256'] }, (err, decoded) => {
		callback(err, decoded);
	});
}

io.on('connection', async (socket) => {
	console.log('connecting..');

	socket.auth = false;
	socket.on('authenticate', (data) => {
		checkAuthToken(data.token, (err, ok) => {
			if (!err && ok && ok.foo == 'bar') {
				console.log("authenticated socket", socket.id);
				socket.auth = true;
				socket.join('editting');
			}
		});
	});

	socket.on('disconnect', () => {
		// do nothing
	});

	socket.on('edit', async (data) => {
		// console.log('on edit: ', data);
		// await AutoSaver.addData('job', data, (data) => { console.log(data);});
		//await autosaver.addData(data);
		socket.to('editting').emit('edit-on-client', data);
		await producer.send({
			topic: TOPIC,
			messages: [
			  { value: JSON.stringify(data) },
			],
		});
	});

	socket.on('message', (data) => {
		console.log("recv a msg: ", JSON.stringify(data));
	});

	socket.on('save-change', async (data) => {
		console.log('write data: ', data);
	});
});

const monitor = require('./controllers/moniter.js');


app.route('/metrics')
	.get(monitor.Monitor.getInstance().get);


server.listen(PORT, async (error) => {
	if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
		await producer.connect();
		console.log("-------------connected-------------");
	} else {
        console.log("Error occurred, server can't start", error);
    }
});


