import { IUser } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { writeDataToFile } from '../utils/writeDataToFile';
import { readDataFromFile } from '../utils/readDataFromFile';

const dataFile = './users.json';

export const findAllUsers = () => {
  return new Promise ((resolve, reject) => {
    try {
      const users = readDataFromFile(dataFile);
    resolve(users);
    } catch (error: any) {
      reject(new Error(error));
    }    
  })
};

export const findUserById = (id: string) => {
  return new Promise ((resolve, reject) => {
    try {
      const users = readDataFromFile(dataFile);
      const user = users.find((user: IUser) => user.id === id);
      resolve(user);
    } catch (error: any) {
      reject(new Error(error));
    }    
  });
};

export const create = (user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    try {
      const newUser = { id: uuidv4(), ...user };
      const users = readDataFromFile(dataFile);
      users.push(newUser);
      writeDataToFile(dataFile, users);
      resolve(newUser);
    } catch (error: any) {
      reject(new Error(error));
    }    
  })
}

export const update = (id: string, user: { username: string; age: number; hobbies: string[]; }) => {
  return new Promise ((resolve, reject) => {
    try {
      const users = readDataFromFile(dataFile);    
      const index = users.map(person => person.id).indexOf(id);
      users[index] = { id, ...user};
      writeDataToFile(dataFile, users);
      resolve(users[index]);
    } catch (error: any) {
      reject(new Error(error));
    }    
  })   
}

export const remove = (id: string) => {
  return new Promise<void> ((resolve, reject) => {
    try {
      const users = readDataFromFile(dataFile);
    const updatedUsers = users.filter((user) => user.id !== id);
    writeDataToFile(dataFile, updatedUsers);
    resolve();
    } catch (error: any) {
      reject(new Error(error));
    }    
  });
};
