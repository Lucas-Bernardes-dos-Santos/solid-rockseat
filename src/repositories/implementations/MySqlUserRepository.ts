import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";

export class MySqlUserRepository implements IUserRepository {
  private users: User[] = []

  constructor() {}

  async findByEmail(email: string): Promise<User> {
    let user = this.users.find(user => user.email === email)
    return user
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}