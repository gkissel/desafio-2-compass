export interface HelloServiceResponse {
  message: string
}

export class HelloService {
  async execute(): Promise<HelloServiceResponse> {
    return { message: 'Hello World' }
  }
}
