import { IUser } from '../types';
import * as uuid from 'uuid';

class UsersService {
  public users: IUser[];

  constructor() {
    this.users = [];
  }

  async apiGetUsers(): Promise<IUser[]> {
    return this.users;
  }

  async apiCreateUser({ username, age, hobbies }: ICandidate): Promise<IUser> {
    this.users.push(prepareUser);
  }

  async apiGetUserById(id: string): Promise<IUser> {
    return this.users.find((user: IUser) => user.id === id);
  }

  async apiDeleteUser(id: string): Promise<IUser> {
    // ваш код 
  }

  async apiUpdateUser(id: string, { username, age, hobbies }: ICandidate): Promise<IUser> {
    // ваш код 
  }
}

export default new UsersService();