

import { createServer } from 'node:http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, 'data.json');
const otherPath = path.join(__dirname, 'other.json');
const usersPath = path.join(__dirname, 'users.json');

const dataRaw = fs.readFileSync(dataPath, 'utf-8');
const otherRaw = fs.readFileSync(otherPath, 'utf-8');
const usersRaw = fs.readFileSync(usersPath, 'utf-8');

const dataJSON = JSON.stringify(JSON.parse(dataRaw));
const otherJSON = JSON.stringify(JSON.parse(otherRaw));
const usersJSON = JSON.stringify(JSON.parse(usersRaw));

const server = createServer((req, res) => {
    const cleanUrl = req.url.split('?')[0];

    if (cleanUrl === '/') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('write with "url/something"');
    } else if (cleanUrl === '/post') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(otherJSON);
    } else if (cleanUrl === '/users') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(usersJSON);
    } else if (cleanUrl === '/todos') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(dataJSON);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Xatolik orqaga qayt ahmoq!');
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on http://127.0.0.1:3000');
});
