'use strict';

const express = require('express');
const app = express();
const fs = require('fs');

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

app.get('/', (req, res) => res.sendFile(__dirname + '/index.htm'));

app.get('/api', (req, res) => {
    
    let hs = req.headers;
    
    let ipaddress = hs['X-Forwarded-For'] || 
                    hs['x-forwarded-for'] || 
                    req.connection.remoteAddress;
                    
    let language = hs['Accept-Language'] ||
                    hs['accept-language']
    
    let software = hs['User-Agent'] ||
                    hs['user-agent']
    
    res.send({
        ipaddress: ipaddress,
        language: language.match(/.{5}/)[0],
        software: software.match(/\(.+\)/)[0].slice(1, -1)
    });
});

app.listen(port, () => console.log(`Server on http://${host}:${port}`));