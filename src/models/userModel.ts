import users from '../data/users.json';
import { IUser } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';

export const findAllUsers = () => {
  return new Promise ((resolve, reject) => {
    resolve(users);
  });
};

export const findUserById = (id: string) => {
  console.log(`userId is ${id}`);
  return new Promise ((resolve, reject) => {
    const user = users.find((user: IUser) => user.id === id);
     resolve(user);
  });
};

export const create = (user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    users.push(newUser);
    writeDataToFile('./src/data/users.json', users);
    writeDataToFile('./users.json', users);
    resolve(newUser);
  })
}

export const update = (id: string, user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    const index = users.findIndex((user) => {
      user.id === id});
      users[index] = { id, ...user};
      writeDataToFile('./users.json', users);
      resolve(users[index]);
    })
}