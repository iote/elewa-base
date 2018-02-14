import { Controller, Post, HttpStatus, HttpCode, Get, Body, HttpException } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { AuthRequestDto } from '../model/interfaces/dto/auth-request.dto.interface';
import { AuthResponseDto } from '../model/interfaces/dto/auth-response.dto.interface';

@Controller('auth')
export class AuthController
{
  constructor(private readonly authService: AuthService) {}

  @Post('authenticate')
  public async authenticate(@Body() req: AuthRequestDto) {
    let auth = this.authService.authenticate(req);

    if(! auth) 
      throw new HttpException('Combination of username and password incorrect.', HttpStatus.BAD_REQUEST);
    
    return auth;
  }
/*
  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  } */
}