import users from '../../users.json';
import { IUser } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';

let usersArray = users;

export const findAllUsers = () => {
  return new Promise ((resolve, reject) => {
    resolve(users);
  });
};

export const findUserById = (id: string) => {
  console.log(`userId is ${id}`);
  return new Promise ((resolve, reject) => {
    const user = usersArray.find((user: IUser) => user.id === id);
     resolve(user);
  });
};

export const create = (user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    usersArray.push(newUser);
    // writeDataToFile('./src/data/users.json', users);
    writeDataToFile('./users.json', usersArray);
    resolve(newUser);
  })
}

export const update = (id: string, user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    const index = usersArray.findIndex((user) => {
      user.id === id});
      usersArray[index] = { id, ...user};
      writeDataToFile('./users.json', usersArray);
      resolve(usersArray[index]);
    })
}

export const remove = (id: string) => {
  console.log(`userId is ${id}`);
  return new Promise<void> ((resolve, reject) => {
    usersArray = usersArray.filter((user) => user.id !== id);
    writeDataToFile('./users.json', usersArray);
    resolve();
  });
};