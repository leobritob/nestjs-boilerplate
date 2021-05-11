import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

@Injectable()
export class EncryptionHelper {
  async hash(password: string) {
    return await bcrypt.hash(password, 5)
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash)
  }
}
