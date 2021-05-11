import { Injectable, BadRequestException } from '@nestjs/common'
import * as jwt from 'jsonwebtoken'

@Injectable()
export class TokenHelper {
  verify(token: string) {
    return jwt.verify(token, process.env.SECRET_KEY)
  }

  decode(token: string) {
    try {
      return jwt.decode(token, { json: true })
    } catch (e) {
      throw new BadRequestException('The token is invalid: ' + e.message)
    }
  }
}
