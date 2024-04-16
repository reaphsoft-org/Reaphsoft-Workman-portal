import { Injectable, NotFoundException } from '@nestjs/common';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  private readonly userRepository: Repository<User> =
    AppDataSource.getRepository(User);
  async validateUser(email: string, password: string) {
    try {
      const user = await this.findUserByEmail(email);
      // Compare the password from the request with the password stored in the database
      return user.password === password;
    } catch (error) {
      // Handle errors
      return false;
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
