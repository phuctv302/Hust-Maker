import express from 'express';
// const express = require('express');

import dotenv from 'dotenv';
dotenv.config();
// require('dotenv').config()

import fs from 'fs';
// const fs = require('fs');
// Local Modules
import router from './routes/route.js';
// const router = require('./routes/route.js');

// Server Initialization
const app = express();

//CORS middleware
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);


router(app);

const PORT = process.env.PORT;

// const http = require('http');
// import http from 'http'
import https from 'https';
// const https = require('https');
const SERVER_KEY = fs.readFileSync('certs/server.key', 'utf8');
const SERVER_CRT = fs.readFileSync('certs/server.crt', 'utf8');
const credentials = {key: SERVER_KEY, cert: SERVER_CRT};

const server = https.createServer(credentials, app);
// const server = http.createServer(app);
app.use(express.static('public'));
app.use(express.static('dist'));


import { Kafka, logLevel } from 'kafkajs';
// const { Kafka, logLevel } = require('kafkajs');

const kafka = new Kafka({
    logLevel: logLevel.DEBUG,
    brokers: [`${process.env.KAFKA_HOST}:${process.env.KAFKA_PORT}`],
    clientId: 'command-consumer',
});



const TOPIC = 'commands';
let consumer = kafka.consumer({ groupId: 'commands-group' });



// const MyLibrary = require('./dist/node.modules');
import { ServersideApplication } from './src/serverside.application.js';
import { CommandFactory } from './src/commands/command.factory.js';
import { Redis } from './src/server.side/redis.js';

let application = new ServersideApplication();

const map_0 = new Set()
let init = async () => {
    let redis_instance = await Redis.getInstance();
    await redis_instance.set("map_0", JSON.stringify(Array.from(map_0)));
}

init();



server.listen(PORT, async (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
        await consumer.connect();

        await consumer.subscribe({ topic: TOPIC, fromBeginning: false });
        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                console.log({
                    partition,
                    offset: message.offset,
                    value: message.value.toString(),
                });

                let props = JSON.parse(message.value.toString());
                console.log(props);
                let command  = CommandFactory.create(application, props);
                // console.log(command.getProps());
                command.execute();

                const component = application.getComponentById(command.getComponentId());
                if (component) {
                    const command_props = CommandFactory.getPropsCreationCommandFromComponent(component);
                    console.log("*******command props", JSON.stringify(command_props));

                    console.log("*******command props");
                    console.log("*******command props");
                    console.log("*******command props");

                    let redis_instance = await Redis.getInstance();
                    await redis_instance.set(component.getId(), JSON.stringify(command_props));

                    if (!map_0.has(component.getId())) {
                        map_0.add(component.getId());
                        await redis_instance.set("map_0", JSON.stringify(Array.from(map_0)));
                    }
                }
            },
        });

    } else {
        console.log("Error occurred, server can't start", error);
    }
});


