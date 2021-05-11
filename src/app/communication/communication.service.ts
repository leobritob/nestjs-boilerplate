import { Injectable, NotImplementedException } from '@nestjs/common'

@Injectable()
export class CommunicationService {
  constructor() {}

  async sendEmail(subject: string, body: string, to: string[]) {
    //TODO: Implement here
    return Promise.resolve(true)
  }
}
