import { IncomingMessage, ServerResponse } from 'http';
import { create, findAllUsers, findUserById, update } from '../models/userModel';
import { v4 as uuidv4 } from 'uuid';
import { getPostData } from '../utils/getPostData';

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
  id?: string,
  username: string;
  age: number;
  hobbies: string[];
}

export const createUser = async (req: any, res: ServerResponse) => {
  try {
    const body = await getPostData(req);

    const { username, age, hobbies } = JSON.parse(body as string);

    const user = {
      username,
      age,
      hobbies,
    }; 

    const newUser = await create(user);

    res.writeHead(201, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(newUser));

  } catch (error) {
    console.log(error);
  }
}

export const updateUser = async (req: any, res: ServerResponse, id: string) => {
  try {
    const user = await findUserById(id) as IUser;
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      const body = await getPostData(req);

      const { username, age, hobbies } = JSON.parse(body as string);

      const userData = {
        username: username  || user.username,
        age: age || user.age,
        hobbies: hobbies || user.hobbies,
      }; 

      const updUser = await update(id, userData);

      res.writeHead(200 , { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(updUser));
    }
  } catch (error) {
    console.log(error); 
  }
}
