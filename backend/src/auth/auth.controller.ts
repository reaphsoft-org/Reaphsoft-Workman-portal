import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ success: { status: boolean } }> {
    const { email, password } = loginDto;
    const success = await this.authService.validateUser(email, password);
    return { success };
  }
}
