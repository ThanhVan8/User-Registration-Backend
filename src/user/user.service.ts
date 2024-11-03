import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';
import { AuthReqDto } from 'src/auth/dto/authReq.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).lean();
  }

  async createUser(authReqDto: AuthReqDto): Promise<User> {
    const newUser = await new this.userModel(authReqDto).save();
    return newUser.toObject();
  }
}
