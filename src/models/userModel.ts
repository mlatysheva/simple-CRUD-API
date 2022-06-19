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
  console.log(`id is ${id}`);
  return new Promise ((resolve, reject) => {
    const users = readDataFromFile(dataFile);
    console.log(`users are:`);
    console.dir(users);
    const index = users.findIndex((u, ind) => {
      console.log(`person.id is ${u.id}`);
      console.log(`id is ${id}`);
      console.log(`person.id === id ${u.id === id}`);
      if (u.id === id) {
        return true;
      } else {
        return false;
      }
    });
    console.log(`index is ${index}`);
    console.log(`user is:`);
    console.dir(users[index]);
    users[index] = { id, ...user};
    writeDataToFile(dataFile, users);
    resolve(users[index]);
    
    // const indexMap = users.map(person => person.id).indexOf(id);
    // console.log(`indexMap is ${indexMap}`);
    // users[indexMap] = { id, ...user};
    // console.log('updated user is:');
    // console.dir(users[indexMap]);
    // writeDataToFile(dataFile, users);
    // resolve(users[indexMap]);
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
