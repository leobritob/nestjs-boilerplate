import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Request } from 'express'
import { SystemMessages } from '../constants/system-messages.constant'
import { AuthService } from './auth.service'
import { ForgotPasswordDto } from './dto/forgot-password.dto'
import { LoginDto } from './dto/login.dto'
import { JWTGuard } from './guards/jwt.guard'
import { EncryptionHelper } from './helpers/encryption'

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  @ApiOperation({ summary: SystemMessages.AUTHENTICATE_AN_USER })
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.JWT_GENERATED_SUCCESSFULLY })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: SystemMessages.INVALID_FIELDS })
  login(@Req() req: Request, @Body() body: LoginDto) {
    return this.authService.login(req.user, body.rememberMe)
  }

  @Get('me')
  @UseGuards(JWTGuard)
  @ApiOperation({ summary: SystemMessages.USER_DATA_OF_JWT })
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.USER_DATA_OF_JWT })
  @ApiResponse({ status: 401, description: SystemMessages.UNAUTHORIZED })
  async me(@Req() req: Request) {
    return req.user
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: SystemMessages.SEND_AN_EMAIL_TO_RECOVERY_PASSWORD })
  @ApiResponse({ status: HttpStatus.OK, description: SystemMessages.PASSWORD_RECOVERY_EMAIL_HAS_BEEN_ALREADY_SENT })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: SystemMessages.INVALID_FIELDS })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: SystemMessages.NOT_FOUND })
  async forgotPassword(@Body() body: ForgotPasswordDto) {
    return await this.authService.forgotPassword(body)
  }

  @Get('pass')
  async pass() {
    const encryptionHelper = new EncryptionHelper()
    return {pass: await encryptionHelper.hash('123456')}
  }
}
