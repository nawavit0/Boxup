const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', require('./server/api.js'));

const server = app.listen(8081, function() {
    const port = server.address().port;
    console.log('Box-UP Server is running.... at port %s', port);
})