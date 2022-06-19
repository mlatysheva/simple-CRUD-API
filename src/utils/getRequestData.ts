import { IncomingMessage } from "http";
import { IUser } from "../types";

export const getRequestData = (request: IncomingMessage): Promise<IUser> => {
  return new Promise((resolve, reject) => {
    try {
      let body = '';
      request.on('data', (chunk: Buffer) => {
        body += chunk.toString();
      });
      request.on('end', () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};