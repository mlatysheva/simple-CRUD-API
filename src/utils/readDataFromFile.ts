import * as fs from 'fs';
import { IUser } from '../types';

export const readDataFromFile = (filePath: string): IUser[] => {
  const rawdata = fs.readFileSync(filePath, 'utf-8');
  if (!rawdata) {
    return [];
  } else {
    return JSON.parse(rawdata);
  }
}