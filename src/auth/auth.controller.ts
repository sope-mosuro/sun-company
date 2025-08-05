import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto'; 
import { LoginDto } from './dto/login.dto';
import { Public } from './decorator/public.decorator';
import { Roles } from './decorator/roles.decorator';
import { RolesGuard } from './guards/roles.guard';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './guards/jwt-auth.guards';




@Controller('auth')
export class AuthController {
     constructor(private authService: AuthService) {}
  
 @UseGuards(RolesGuard)
 @Roles('admin')
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

   @Public()
   @Post('login')
 async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.login(loginDto);
    res.cookie('access_token', result.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    });
    return { message: result.message };
  }
}
