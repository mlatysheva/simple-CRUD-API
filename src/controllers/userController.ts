import { IncomingMessage, ServerResponse } from 'http';
import { create, findAllUsers, findUserById, update, remove } from '../models/userModel';
import { IUser } from '../types';
import { getPostData } from '../utils/getPostData';
import { uuidValidateV4 } from '../utils/uuidValidate';

// @route   GET api/users
export const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  try {    
    const users = await findAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error processing your request.' }));
    console.error(`Error getting users: ${error}`);
  }
}

// @route   GET api/users/:id
export const getUserById = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  try {    
    const user = await findUserById(id);
    if (!(uuidValidateV4(id))) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User id ${id} is not a valid uuid` }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }    
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error processing your request.' }));
    console.error(`Error getting user with id ${id}: ${error}`);
  }
}

// @route   POST api/users

export const createUser = async (req: any, res: ServerResponse) => {
  try {
    const body = await getPostData(req);
    const { username, age, hobbies } = JSON.parse(body as string);

    const user = {
      username,
      age,
      hobbies,
    }; 
    if (!username || !age || !hobbies) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `Fields: username, age and hobbies are required. Please submit all required info.` }));
      return;
    } else {
      const newUser = await create(user);

      res.writeHead(201, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(newUser));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error processing your request.' }));
    console.error(`Error creating user: ${error}`);
  }
}

// @route   PUT api/users/:id
export const updateUser = async (req: any, res: ServerResponse, id: string) => {
  try {
    const user = await findUserById(id) as IUser;
    if (!(uuidValidateV4(id))) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User id ${id} is not a valid uuid` }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body = await getPostData(req);
      const { username, age, hobbies } = JSON.parse(body as string);
      console.dir(body);
      const userData = {
        username: username  || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }; 
      console.dir(userData);

      const updUser = await update(id, userData);

      res.writeHead(200 , { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error processing your request.' }));
    console.error(`Error updating user with id ${id}: ${error}`);
  }
}

// @route   DELETE api/users/:id

export const deleteUser = async (req: any, res: ServerResponse, id: string) => {
  try {
    const user = await findUserById(id) as IUser;
    if (!(uuidValidateV4(id))) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: `User id ${id} is not a valid uuid` }));
    } else if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      await remove(id);
      res.writeHead(200 , { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify({ message: `User ${id} removed.` }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Error processing your request.' }));
    console.error(`Error deleting user with id ${id}: ${error}`);
  }
}
