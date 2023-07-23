import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    if (await this.userExists(data.email)) throw new Error('User already exist.')

    let user = new User(data)
    await this.userRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe Rockseat',
        email: 'rockseat@gmail.com'
      },
      subject: 'Mensagem de boas-vindas',
      body: '<p>Seu usário já pode fazer login na plataforma</p>'
    })
  }

  private async userExists(email: string): Promise<boolean> {
    let user = await this.userRepository.findByEmail(email)

    if (user) return true
    return false
  }
}