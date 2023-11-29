import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: UserService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
      const userDb = await this.userService.findOne({ email });

      if (!userDb) {
        throw new BadRequestException('Invalid Credentials');
      }
       if (userDb?.password !== pass) {
           return null;
       }

       return userDb;
  }

}
