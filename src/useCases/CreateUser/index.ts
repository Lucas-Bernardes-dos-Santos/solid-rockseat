import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { MySqlUserRepository } from "../../repositories/implementations/MySqlUserRepository";
import { CreateUserUseCase } from "./CreateUseUserCase";
import { CreateUserController } from "./CreateUserController";

const mailTrapMailProvider = new MailTrapMailProvider()
const mySqlUserRepository = new MySqlUserRepository()

const createUserUseCase = new CreateUserUseCase(
  mySqlUserRepository,
  mailTrapMailProvider
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }