import { Controller, Post, HttpStatus, HttpCode, Get, Body, HttpException } from '@nestjs/common';

import { AuthService } from '../services/auth.service';

import { AuthRequestDto } from '../model/interfaces/dto/auth-request.dto.interface';
import { AuthResponseDto } from '../model/interfaces/dto/auth-response.dto.interface';
import { RegisterRequestDto } from '../model/interfaces/dto/register-request.dto.interface';

@Controller('auth')
export class AuthController
{
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  public async register(@Body() req: RegisterRequestDto) {
    try {
      let auth = this.authService.register(req);

      // Registration success. Next expected server call is login
      return true;
    }
   catch(e) {
     console.error(e);
     throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
   }
  }

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