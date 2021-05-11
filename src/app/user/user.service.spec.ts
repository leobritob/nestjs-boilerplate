import { Test, TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { StoreUserDto } from './dto/store-user.dto'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { IndexQueryDto } from './dto/index-query.dto'
import { AuthService } from '../../auth/auth.service'
import { JwtService } from '@nestjs/jwt'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config/dist/config.service'
import { EncryptionHelper } from '../../auth/helpers/encryption'

const userEntityMock = new UserEntity({
  id: '241c1ebd-7c5a-4586-9aa2-98e2e8e4b4c1',
  firstName: 'Leonardo',
  lastName: 'Brito',
  email: 'leonardobritobittencourt@gmail.com',
  password: '',
  isActive: 1,
  createdAt: '',
  updatedAt: '',
  deletedAt: null,
  encryptPassword: () => null,
})

const userEntityListMock = [userEntityMock]

describe('UserService', () => {
  let userService: UserService
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockImplementation((payload, options) => {
              return jwt.sign(payload, options.secret, { expiresIn: options.expiresIn })
            }),
          },
        },
        {
          provide: EncryptionHelper,
          useValue: {
            hash: jest.fn().mockResolvedValue('$2b$05$mlzz/3cqjSYvGZmQrTkv5umJc9dyuF..Xqt8dsifqXvIXTyGUgAOK'),
            compare: jest.fn().mockResolvedValue(true),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('2v2CBsz+4y6jVzwJqH5C3XSmZr9DaA+GxBWe/i5TrCE='),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            update: jest.fn().mockReturnValue(userEntityListMock),
            createQueryBuilder: jest.fn().mockReturnThis(),
            offset: jest.fn().mockReturnThis(),
            limit: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            addSelect: jest.fn().mockReturnThis(),
            create: jest.fn().mockReturnThis(),
            save: jest.fn().mockReturnValue(userEntityListMock[0]),
            findOneOrFail: jest.fn().mockReturnValue(userEntityListMock[0]),
            getOne: jest.fn().mockReturnValue(userEntityListMock[0]),
            merge: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            andWhere: jest.fn().mockReturnThis(),
            getManyAndCount: jest.fn().mockResolvedValue([userEntityListMock, userEntityListMock.length]),
            softDelete: jest.fn().mockResolvedValue(null),
            findOne: jest.fn().mockReturnValue(userEntityListMock[0]),
          },
        },
      ],
    }).compile()

    userService = module.get<UserService>(UserService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))
  })

  it('should be defined', () => {
    expect(userService).toBeDefined()
    expect(userRepository).toBeDefined()
  })

  describe('index', () => {
    it('should return a list of users', async () => {
      const result = await userService.index()

      const expected = {
        currentPage: 1,
        itemsPerPage: 10,
        itemsTotal: userEntityListMock.length,
        totalPages: 1,
        items: userEntityListMock,
      }

      //assert
      expect(result).toEqual(expected)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.isActive',
      ])
      expect(userRepository.createQueryBuilder().offset).toBeCalledWith(0)
      expect(userRepository.createQueryBuilder().getManyAndCount).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getManyAndCount).toReturnWith(
        Promise.resolve([userEntityListMock, userEntityListMock.length]),
      )
    })

    it('should go to next page when passing a parameter', async () => {
      const data: UserEntity[] = []

      jest.spyOn(userRepository.createQueryBuilder(), 'getManyAndCount').mockResolvedValueOnce([data, 0])

      const params: IndexQueryDto = { page: 3 }
      const result = await userService.index(params)

      const expected = {
        currentPage: params.page,
        itemsPerPage: 10,
        itemsTotal: 0,
        totalPages: 0,
        items: data,
      }

      //assert
      expect(result).toEqual(expected)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.isActive',
      ])
      expect(userRepository.createQueryBuilder().offset).toBeCalledWith((params.page - 1) * 10)
      expect(userRepository.createQueryBuilder().getManyAndCount).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getManyAndCount).toReturnWith(
        Promise.resolve([userEntityListMock, userEntityListMock.length]),
      )
    })

    it('should go to previous page when passing a parameter', async () => {
      const data: UserEntity[] = []

      jest.spyOn(userRepository.createQueryBuilder(), 'getManyAndCount').mockResolvedValueOnce([data, 0])

      const params: IndexQueryDto = { page: 2 }
      const result = await userService.index(params)

      const expected = {
        currentPage: params.page,
        itemsPerPage: 10,
        itemsTotal: 0,
        totalPages: 0,
        items: data,
      }

      //assert
      expect(result).toEqual(expected)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.isActive',
      ])
      expect(userRepository.createQueryBuilder().offset).toBeCalledWith((params.page - 1) * 10)
      expect(userRepository.createQueryBuilder().getManyAndCount).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getManyAndCount).toReturnWith(
        Promise.resolve([userEntityListMock, userEntityListMock.length]),
      )
    })

    it('should throw an internal server error when ORM does not work', () => {
      jest.spyOn(userRepository.createQueryBuilder(), 'getManyAndCount').mockImplementationOnce(() => {
        throw new Error()
      })

      //assert
      expect(userService.index()).rejects.toThrowError()
    })

    it('should find a list of user by the name option', async () => {
      // Arrange
      const expected = {
        currentPage: 1,
        itemsPerPage: 10,
        itemsTotal: userEntityListMock.length,
        totalPages: 1,
        items: userEntityListMock,
      }
      const params: IndexQueryDto = { name: 'Ariana' }

      // Act
      const result = await userService.index(params)

      // Assert
      expect(result).toEqual(expected)
      expect(userRepository.createQueryBuilder().select).toBeCalledWith([
        'user.id',
        'user.firstName',
        'user.lastName',
        'user.email',
        'user.isActive',
      ])
      expect(userRepository.createQueryBuilder().andWhere).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().andWhere).toBeCalledWith(
        `(user.firstName LIKE :name OR user.lastName LIKE :name)`,
        {
          name: `%${params.name}%`,
        },
      )
      expect(userRepository.createQueryBuilder().offset).toBeCalledWith(0)
      expect(userRepository.createQueryBuilder().getManyAndCount).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().getManyAndCount).toReturnWith(
        Promise.resolve([userEntityListMock, userEntityListMock.length]),
      )
    })
  })

  describe('store', () => {
    const data: StoreUserDto = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'test',
      confirmPassword: 'test',
    }

    it('should save new user successfully', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null)

      // Act
      const result = await userService.store(data)

      // Assert
      expect(result).toEqual(userEntityListMock[0])
      expect(userRepository.create).toBeCalledTimes(1)
      expect(userRepository.save).toBeCalledTimes(1)
      expect(userRepository.create).toBeCalledWith(data)
    })

    it('should throw an exception when ORM does not work', () => {
      // Arrange
      jest.spyOn(userRepository, 'save').mockRejectedValueOnce(new Error())

      // Assert
      expect(userService.store(data)).rejects.toThrowError()
    })

    it('should throw a bad request exception when user already exists', async () => {
      // Arrange
      const userMock = new UserEntity(data)

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userMock)

      // Assert
      expect(userService.store(data)).rejects.toThrowError(BadRequestException)
    })
  })

  describe('update', () => {
    const id = userEntityListMock[0].id
    const data: StoreUserDto = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'test',
      confirmPassword: 'test',
    }

    it('should update an user successfully', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null)

      const expected = new UserEntity({ ...userEntityListMock[0], firstName: 'xpto' })

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(expected)

      // Act
      const result = await userService.update(id, data)

      // Assert
      expect(result).toEqual(expected)
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.findOneOrFail).toBeCalledWith({ id }, undefined)
      expect(userRepository.merge).toBeCalledTimes(1)
      expect(userRepository.save).toBeCalledTimes(1)
    })

    it('should a not found exception when user is not exists', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockImplementationOnce(() => {
        throw new Error()
      })

      //assert
      expect(userService.update(id, data)).rejects.toThrowError(NotFoundException)
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.findOneOrFail).toBeCalledWith({ id }, undefined)
      expect(userRepository.merge).not.toBeCalledTimes(1)
      expect(userRepository.save).not.toBeCalledTimes(1)
    })

    it('should throw an internal server error when ORM does not work', () => {
      jest.spyOn(userRepository, 'merge').mockImplementationOnce(() => {
        throw new Error()
      })

      //assert
      expect(userService.update(id, data)).rejects.toThrowError()
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.findOneOrFail).toBeCalledWith({ id }, undefined)
      expect(userRepository.save).not.toBeCalledTimes(1)
    })

    it('should throw a bad request exception when user already exists', async () => {
      // Arrange
      const userMock = new UserEntity(data)

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userMock)

      // Assert
      expect(userService.update(id, data)).rejects.toThrowError(BadRequestException)
    })
  })
  describe('updatePassword', () => {
    const id = userEntityListMock[0].id
    const data: StoreUserDto = {
      firstName: 'test',
      lastName: 'test',
      email: 'test@test.com',
      password: 'test',
      confirmPassword: 'test',
    }

    it('should update an password user successfully', async () => {
      // Arrange
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null)

      const expected = new UserEntity({ ...userEntityListMock[0], firstName: 'user' })

      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(expected)

      // Act
      const result = await userService.updatePassword(data, userEntityMock)

      // Assert
      expect(result).toEqual(expected)
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.merge).toBeCalledTimes(1)
      expect(userRepository.save).toBeCalledTimes(1)
    })

    it('should a not found exception when user is not exists', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValue(new Error())

      //assert
      expect(userService.update(id, data)).rejects.toThrowError(NotFoundException)
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.findOneOrFail).toBeCalledWith({ id }, undefined)
      expect(userRepository.merge).not.toBeCalledTimes(1)
      expect(userRepository.save).not.toBeCalledTimes(1)
    })
  })

  describe('show', () => {
    it('should get the data of an user by id', async () => {
      const result = await userService.show(userEntityListMock[0].id)

      //assert
      expect(result).toEqual(userEntityListMock[0])
      expect(userRepository.createQueryBuilder().getOne).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().where).toBeCalledTimes(1)
    })

    it('should throw a not found exception when the user is not exists', () => {
      jest.spyOn(userRepository.createQueryBuilder(), 'getOne').mockRejectedValueOnce(new Error())

      //assert
      expect(userService.show(userEntityListMock[0].id)).rejects.toThrowError()
      expect(userRepository.createQueryBuilder().getOne).toBeCalledTimes(1)
      expect(userRepository.createQueryBuilder().where).toBeCalledTimes(1)
    })
  })

  describe('delete', () => {
    it('should delete an user successfully', async () => {
      const result = await userService.delete(userEntityListMock[0].id)

      //assert
      expect(result).toBeUndefined()
      expect(userRepository.findOneOrFail).toBeCalledWith({ id: userEntityListMock[0].id }, undefined)
      expect(userRepository.softDelete).toBeCalledWith({ id: userEntityListMock[0].id })
    })

    it('should throw an internal server error exception when user is not exists', () => {
      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(() => new Error())

      //assert
      expect(userService.delete(userEntityListMock[0].id)).rejects.toThrowError(NotFoundException)
    })
  })

  describe('findOneOrFail', () => {
    it('should return an user successfully', async () => {
      const id = userEntityListMock[0].id
      const result = await userService.findOneOrFail({ id })

      expect(result).toEqual(userEntityListMock[0])
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.findOneOrFail).toBeCalledWith({ id }, undefined)
    })

    it('should throw a not found exception when ORM does not work', async () => {
      const id = userEntityListMock[0].id

      jest.spyOn(userRepository, 'findOneOrFail').mockRejectedValueOnce(() => new Error())

      expect(userService.findOneOrFail({ id })).rejects.toThrowError(NotFoundException)
      expect(userRepository.findOneOrFail).toBeCalledTimes(1)
      expect(userRepository.findOneOrFail).toBeCalledWith({ id }, undefined)
    })
  })

  describe('checkDuplicateUser', () => {
    it('should return an undefind data', () => {
      // Arrange
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(null)

      // Assert
      expect(userService.checkDuplicateUser('teste')).resolves.toBeUndefined()
    })

    it('should throw a bad request exception when duplicate user is found', () => {
      // Arrange
      const userMock = new UserEntity({
        id: 'cf3c923e-729c-4e0a-896d-3cd9187bf7dd',
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@admin.com',
        password: '123456',
        isActive: 1,
      })

      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userMock)

      // Assert
      expect(userService.checkDuplicateUser('admin')).rejects.toThrowError(BadRequestException)
    })
  })
})
