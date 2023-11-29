import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Response, response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(
      @Request() req,
      @Res({ passthrough: true }) response: Response,
  ) {
    delete req.user.password;

    const jwt = await this.jwtService.signAsync({ id: req.user.id });
    response.cookie('jwt', jwt, { httpOnly: true });

    const data= req.user
      
    return {data,"token":jwt};
  }
}
