#! /usr/bin/env node
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import http from 'http';
// import users from './data/users.json';
import users from '../users.json';
import * as dotenv from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
import { getUsers, getUserById, createUser, updateUser, deleteUser } from './controllers/userController';

dotenv.config({ path: resolve(cwd(), '.env') });

const server = http.createServer((req, res) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url?.match(/\/api\/users\/[a-zA-Z0-9]*/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getUserById(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUser(req, res);
  } else if (req.url?.match(/\/api\/users\/[a-zA-Z0-9]*/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateUser(req, res, id);
  } else if (req.url?.match(/\/api\/users\/[a-zA-Z0-9]*/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteUser(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default { server };
//# sourceMappingURL=server.js.map