import { Controller, Post, HttpStatus, HttpCode, Get, Body } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { BearerRequest } from '../model/interfaces/bearer-request.interface';

@Controller('auth')
export class AuthController
{
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  public async getToken(@Body() bearerReq: BearerRequest) {
    return await this.authService.createBearerToken(bearerReq.refreshToken);
  }
/*
  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  } */
}