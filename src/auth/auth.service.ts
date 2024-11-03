import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from 'src/user/user.model';
import * as bcrypt from 'bcrypt';
import { AuthReqDto } from './dto/authReq.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(authReq: AuthReqDto): Promise<User | null> {
    const user = await this.userService.findByEmail(authReq.email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(authReq.password, user?.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  async register(authReq: AuthReqDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(authReq.password, 10);
    authReq.password = hashedPassword;

    const newUser = this.userService.createUser(authReq);
    return newUser;
  }
}
