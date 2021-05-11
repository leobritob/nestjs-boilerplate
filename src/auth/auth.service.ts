import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist/config.service'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CommunicationService } from '../app/communication/communication.service'
import { UserEntity } from '../app/user/user.entity'
import { SystemMessages } from '../constants/system-messages.constant'
import { PasswordRecoveryTemplate } from '../templates/password-recovery'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { EncryptionHelper } from './helpers/encryption'

@Injectable()
export class AuthService {
  private readonly frontEndUrl = process.env.FRONTEND_URL

  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly encryptionHelper: EncryptionHelper,
    private readonly communicationService: CommunicationService,
  ) {}

  async validateUser(email: string, password: string) {
    try {
      let authUser = null

      const user = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.password'])
        .where('user.email = :email', { email })
        .andWhere('user.isActive = 1')
        .getOne()

      if (!user) throw new Error()

      const isValid = await this.encryptionHelper.compare(password, user.password)
      if (isValid) {
        authUser = { ...user }
        delete authUser.password
      }

      return authUser
    } catch (e) {
      throw new BadRequestException(SystemMessages.EMAIL_OR_PASSWORD_ARE_INVALIDS)
    }
  }

  login(user: any, rememberMe?: boolean) {
    const payload = { user, sub: user.id }
    return {
      token: this.generateToken(payload, { expiresIn: rememberMe ? '30d' : '1h' }),
      user,
    }
  }

  async forgotPassword(data: ForgotPasswordDto) {
    let user: UserEntity

    try {
      user = await this.userRepository.findOneOrFail({ email: data.email, isActive: 1 })
    } catch (e) {
      throw new NotFoundException(e.message)
    }

    const token = this.generateToken({ ...user }, { expiresIn: '1h' })
    const url = `${this.frontEndUrl}/alterar-senha/${token}`

    const subject = 'Solicitação de Recuperação de Senha'
    const body = PasswordRecoveryTemplate({ firstName: user.firstName, url })
    const to = [user.email]

    const wasItSent = await this.communicationService.sendEmail(subject, body, to)
    if (!wasItSent) throw new BadRequestException(SystemMessages.EMAIL_WAS_NOT_SENT_CORRECTLY)

    return true
  }

  generateToken(payload: any, options?: JwtSignOptions) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get('SECRET_KEY'),
      ...options,
    })
  }
}
