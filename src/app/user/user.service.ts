import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { SystemMessages } from '../../constants/system-messages.constant'
import { FindConditions, FindOneOptions, Repository, SelectQueryBuilder } from 'typeorm'
import { AuthInterface } from '../../auth/interfaces/auth-request.interface'
import { UserEntity } from './user.entity'
import { IndexQueryDto } from './dto/index-query.dto'
import { PatchUserDto } from './dto/patch-user.dto'
import { StoreUserDto } from './dto/store-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserPasswordDto } from './dto/user-password.dto'
import { EncryptionHelper } from '../../auth/helpers/encryption'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async index(options?: IndexQueryDto) {
    const itemsPerPage = options?.itemsPerPage ? Number(options.itemsPerPage) : 10
    const currentPage = options?.page ? Number(options.page) : 1

    const query = this.userRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.firstName', 'user.lastName', 'user.email', 'user.isActive'])
      .offset((currentPage - 1) * itemsPerPage)
      .limit(itemsPerPage)

    this.filterOptions(query, options, 'user')

    const [users, itemsTotal] = await query.getManyAndCount()

    return {
      currentPage,
      itemsPerPage,
      itemsTotal,
      totalPages: Math.ceil(itemsTotal / itemsPerPage),
      items: users,
    }
  }

  async store(data: StoreUserDto) {
    await this.checkDuplicateUser(data.email)

    try {
      const user = await this.userRepository.save(this.userRepository.create(data))
      return user
    } catch (e) {
      throw new BadRequestException(e?.message)
    }
  }

  async update(id: string, data: UpdateUserDto | PatchUserDto) {
    const users = await this.findOneOrFail({ id })

    if (users.email !== (data as UpdateUserDto).email) {
      await this.checkDuplicateUser((data as UpdateUserDto).email)
    }

    this.userRepository.merge(users, data)
    return await this.userRepository.save(users)
  }

  async updatePassword(data: UserPasswordDto, user: AuthInterface) {
    const encryptionHelper = new EncryptionHelper()
    const users = await this.findOneOrFail({ id: user.id, isActive: 1 })

    data.password = await encryptionHelper.hash(data.password)

    this.userRepository.merge(users, data)
    return await this.userRepository.save(users)
  }

  async show(id: string) {
    const users = await this.userRepository.createQueryBuilder('users').where('users.id = :id', { id }).getOne()

    if (!users) throw new NotFoundException()

    return users
  }

  async delete(id: string) {
    await this.findOneOrFail({ id })
    await this.userRepository.softDelete({ id })
  }

  async findOneOrFail(conditions?: FindConditions<UserEntity>, options?: FindOneOptions<UserEntity>) {
    try {
      return await this.userRepository.findOneOrFail(conditions, options)
    } catch (e) {
      throw new NotFoundException(e?.message)
    }
  }

  async checkDuplicateUser(email: string): Promise<void> {
    const users = await this.userRepository.findOne({ email })
    if (users) throw new BadRequestException(SystemMessages.DUPLICATE_EMAIL)
  }

  filterOptions(query: SelectQueryBuilder<UserEntity>, options: IndexQueryDto, alias: string) {
    if (options?.name) {
      const name = `%${options.name}%`
      query.andWhere(`(${alias}.firstName LIKE :name OR ${alias}.lastName LIKE :name)`, { name })
    }
  }
}
