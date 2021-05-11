import { BadRequestException, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config/dist/config.service'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from '../app/user/user.entity'
import { AuthService } from './auth.service'
import { EncryptionHelper } from './helpers/encryption'
import { TokenHelper } from './helpers/token.helper'
import * as jwt from 'jsonwebtoken'
import * as moment from 'moment'
import { CommunicationService } from '../app/communication/communication.service'

const userEntityMock: UserEntity = {
  id: '4ed1e1e7-7bf3-4491-aa04-03ee0c1ac9c7',
  firstName: 'Teste',
  lastName: 'teste',
  email: 'teste@teste.com',
  password: '$2b$05$mlzz/3cqjSYvGZmQrTkv5umJc9dyuF..Xqt8dsifqXvIXTyGUgAOK',
  isActive: 1,
  createdAt: '2021-05-07T12:00:00Z',
  updatedAt: '2021-05-07T12:00:00Z',
  deletedAt: null,
  encryptPassword: () => null,
}

describe('AuthService', () => {
  let authService: AuthService
  let userRepository: Repository<UserEntity>
  let encryptionHelper: EncryptionHelper
  let jwtService: JwtService
  let configService: ConfigService
  let communicationService: CommunicationService
  const tokenHelper = new TokenHelper()

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            createQueryBuilder: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            getOne: jest.fn().mockResolvedValue(userEntityMock),
            findOneOrFail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((payload, options) => {
              return jwt.sign(payload, options.secret, { expiresIn: options.expiresIn })
            }),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('2v2CBsz+4y6jVzwJqH5C3XSmZr9DaA+GxBWe/i5TrCE='),
          },
        },
        {
          provide: EncryptionHelper,
          useValue: {
            hash: jest.fn().mockResolvedValue(userEntityMock.password),
            compare: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: CommunicationService,
          useValue: {
            sendEmail: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile()

    authService = module.get<AuthService>(AuthService)
    jwtService = module.get<JwtService>(JwtService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
    encryptionHelper = module.get<EncryptionHelper>(EncryptionHelper)
    configService = module.get<ConfigService>(ConfigService)
    communicationService = module.get<CommunicationService>(CommunicationService)
  })

  it('should be defined', () => {
    expect(authService).toBeDefined()
    expect(jwtService).toBeDefined()
    expect(userRepository).toBeDefined()
    expect(encryptionHelper).toBeDefined()
    expect(configService).toBeDefined()
    expect(communicationService).toBeDefined()
  })

  describe('validateUser', () => {
    it('should validate an user successfully', async () => {
      const result = await authService.validateUser(userEntityMock.email, '123456')

      const expected: any = { ...userEntityMock }
      delete expected.password

      //assert
      expect(result).toEqual(expected)
      expect(userRepository.createQueryBuilder().select).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.password',
      ])
      expect(userRepository.createQueryBuilder().where).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getOne).toBeCalledTimes(1)
    })

    it('should throw a bad request exception when user is not exists', () => {
      jest.spyOn(userRepository.createQueryBuilder(), 'getOne').mockResolvedValueOnce(null)

      //assert
      expect(authService.validateUser(userEntityMock.email, '123456')).rejects.toThrowError(BadRequestException)
      expect(userRepository.createQueryBuilder().select).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.password',
      ])
      expect(userRepository.createQueryBuilder().where).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getOne).toBeCalledTimes(1)
    })

    it('should throw a bad request exception when password is wrong', async () => {
      jest.spyOn(encryptionHelper, 'compare').mockResolvedValueOnce(false)

      const result = await authService.validateUser(userEntityMock.email, '123456')

      expect(result).toBeNull()
      expect(userRepository.createQueryBuilder().select).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.password',
      ])
      expect(userRepository.createQueryBuilder().where).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getOne).toBeCalledTimes(1)
    })
  })

  describe('login', () => {
    it('should generate a jwt successfully', () => {
      const result = authService.login(userEntityMock, false)

      //assert
      expect(result.token).toBeDefined()
      expect(result.user).toBeDefined()
      expect(result.user).toEqual(userEntityMock)
    })

    it('should generate a jwt with an expiration time in 30 days', () => {
      const result = authService.login(userEntityMock, true)

      //assert
      expect(result.token).toBeDefined()
      expect(result.user).toBeDefined()
      expect(result.user).toEqual(userEntityMock)
      expect(
        moment.utc(new Date(tokenHelper.decode(result.token).exp * 1000)).diff(moment.utc(), 'days', false),
      ).toEqual(29)
    })
  })

  describe('forgotPassword', () => {
    it('should return true and send email to user successfully', async () => {
      // Act
      const result = await authService.forgotPassword({ email: 'fake@email.com' })

      // Assert
      expect(result).toBeTruthy()
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(communicationService.sendEmail).toBeCalledTimes(1)
      expect(jwtService.sign).toBeCalledTimes(1)
    })

    it('should throw a not found exception when user not found', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(new Error())

      // Assert
      expect(authService.forgotPassword({ email: 'fake@email.com' })).rejects.toThrowError(NotFoundException)
    })

    it('should throw a bad request exception when email not send', async () => {
      // Arrange
      jest.spyOn(communicationService, 'sendEmail').mockResolvedValueOnce(false)

      // Assert
      expect(authService.forgotPassword({ email: 'fake@email.com' })).rejects.toThrowError(BadRequestException)
    })
  })
})
