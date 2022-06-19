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
    // const index = users.findIndex((person) => {
    //   console.log(`person.id is ${person.id}`);
    //   console.log(`id is ${id}`);
    //   console.log(`person.id === id ${person.id === id}`);
    //   person.id === id;
    // });
    // console.log(`index is ${index}`);
    // console.log(`user is:`);
    // console.dir(users[index]);
    // users[index] = { id, ...user};
    
    const indexMap = users.map(person => person.id).indexOf(id);
    console.log(`indexMap is ${indexMap}`);
    users[indexMap] = { id, ...user};
    console.log('updated user is:');
    console.dir(users[indexMap]);
    writeDataToFile(dataFile, users);
    resolve(users[indexMap]);
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
