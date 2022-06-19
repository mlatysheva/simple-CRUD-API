/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from 'fs';

export const writeDataToFile = (filePath: string, content: any) => {
  fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
}
