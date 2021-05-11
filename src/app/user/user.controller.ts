import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common'
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger'
import { JWTGuard } from '../../auth/guards/jwt.guard'
import { AuthRequestInterface } from '../../auth/interfaces/auth-request.interface'
import { SystemMessages } from '../../constants/system-messages.constant'
import { UserService } from './user.service'
import { IndexQueryDto } from './dto/index-query.dto'
import { UserPasswordDto } from './dto/user-password.dto'
import { PatchUserDto } from './dto/patch-user.dto'
import { StoreUserDto } from './dto/store-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('api/v1/users')
@ApiTags('user')
@ApiBearerAuth()
@UseGuards(JWTGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.USER_LIST })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async index(@Query() query: IndexQueryDto) {
    return await this.userService.index(query)
  }

  @Post()
  @ApiResponse({ status: HttpStatus.CREATED, description: SystemMessages.STORE_USER })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: SystemMessages.INVALID_FIELDS })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async store(@Body() body: StoreUserDto) {
    return await this.userService.store(body)
  }

  @Get(':id')
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.SHOW_USER })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: SystemMessages.INVALID_FIELDS })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async show(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.userService.show(id)
  }

  @Put(':id')
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.UPDATE_USER })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: SystemMessages.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async update(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: UpdateUserDto) {
    return await this.userService.update(id, body)
  }

  @Patch('update-password')
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.UPDATE_USER })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: SystemMessages.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async changePassword(@Req() req: AuthRequestInterface, @Body() data: UserPasswordDto) {
    return await this.userService.updatePassword(data, req.user)
  }

  @Patch(':id')
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.UPDATE_USER })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: SystemMessages.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async patch(@Param('id', new ParseUUIDPipe()) id: string, @Body() body: PatchUserDto) {
    return await this.userService.update(id, body)
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.UPDATE_USER })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: SystemMessages.NOT_FOUND })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: SystemMessages.UNAUTHORIZED })
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    await this.userService.delete(id)
  }
}
