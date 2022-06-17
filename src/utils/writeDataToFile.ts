/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';
import users from '../../users.json';

export const writeDataToFile = (filePath: string, content: any) => {
  console.log(users.forEach((user) => console.log(user)));
  fs.writeFileSync(filePath, JSON.stringify(content));
}
