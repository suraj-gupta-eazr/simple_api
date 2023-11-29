import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';

@Crud({
  model: {
    type: User,
  },
})
@Controller('user')
export class UserController implements CrudController<User> {
  constructor(public service: UserService, private jwtService: JwtService) {}

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.service.findOne({ email: email });

    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }

    const jwt = await this.jwtService.signAsync({ id: user.id });

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'Successfully signed',
    };
  }

  @Get()
  async user(@Req() request: Request) {
    try {
      const cookie = this.extractTokenFromHeader(request);
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const user = await this.service.findOne({ id: data['id'] });
      
      delete user.password
      return user;
      
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
