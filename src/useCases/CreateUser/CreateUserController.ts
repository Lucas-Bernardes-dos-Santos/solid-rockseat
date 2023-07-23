import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUseUserCase";

export class CreateUserController {
  constructor(
    private creatUserUseCase: CreateUserUseCase
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body

    try {
      await this.creatUserUseCase.execute({
        name, email, password
      })  
      return response.status(200).send()
    } catch (error) {
      return response.status(400).json({
        message: error.message || 'Unexpected error.'
      })
    }
  }
}