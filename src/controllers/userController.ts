import { IncomingMessage, ServerResponse } from 'http';
import { create, findAllUsers, findUserById } from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';

// @route   GET api/users

export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {    
    const users = await findAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
}

// @route   GET api/users/:id
export const getUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {    
    const user = await findUserById(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
    
  } catch (error) {
    console.log(error);
  }
}

// @route   POST api/users

interface IUser {
  username: string;
  age: number;
  hobbies: string[];
}

export const createUser = async (req: any, res: ServerResponse) => {
  try {

    let body = '';

    req.on('data', (chunk: { toString: () => string; }) => {
      body += chunk.toString()
    });

    req.on('end', async () => {
      const {username, age, hobbies } = JSON.parse(body);

      const user = {
        username,
        age,
        hobbies,
      };

      const newUser = await create(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    })
    
  } catch (error) {
    console.log(error);
  }
}
