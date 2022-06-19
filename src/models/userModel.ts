import { IUser } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';
import { readDataFromFile } from '../utils/readDataFromFile';

const dataFile = './users.json';

export const findAllUsers = () => {
  return new Promise ((resolve, reject) => {
    const users = readDataFromFile(dataFile);
    resolve(users);
  })
};

export const findUserById = (id: string) => {
  console.log(`userId is ${id}`);
  return new Promise ((resolve, reject) => {
    const users = readDataFromFile(dataFile);
    const user = users.find((user: IUser) => user.id === id);
     resolve(user);
  });
};

export const create = (user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    const newUser = { id: uuidv4(), ...user };
    const users = readDataFromFile(dataFile);
    users.push(newUser);
    writeDataToFile(dataFile, users);
    resolve(newUser);
  })
}

export const update = (id: string, user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    const users = readDataFromFile(dataFile);
    const index = users.findIndex((user) => {
      user.id === id});
    users[index] = { id, ...user};
    writeDataToFile(dataFile, users);
    resolve(users[index]);
  })   
}

export const remove = (id: string) => {
  return new Promise<void> ((resolve, reject) => {
    const users = readDataFromFile(dataFile);
    const updatedUsers = users.filter((user) => user.id !== id);
    writeDataToFile(dataFile, updatedUsers);
    resolve();
  });
};