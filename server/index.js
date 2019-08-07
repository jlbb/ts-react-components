// eslint-disable import/no-extraneous-dependencies
const path = require('path');
// eslint-disable-next-line import/no-extraneous-dependencies
const express = require('express');
// eslint-disable-next-line import/no-extraneous-dependencies
const open = require('open');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'dist/index.html'));
});

app.get('/main.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'dist/main.css'));
});

app.get('/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'dist/app.js'));
});

// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);
const port = app.get('port');
const url = `http://localhost:${port}`;

app.listen(port, () => {
    console.log(`Production server listening on port... ${url}`);
    open(url);
});
