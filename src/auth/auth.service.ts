import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/users/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';



@Injectable()
export class AuthService {
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password, role } = registerDto;
    
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(email);
    // console.log('register called with:', registerDto);
    // console.log(email)
    // console.log('findByEmail result:', existingUser);
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await this.usersService.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });
   
    const userSafe = plainToInstance(User, newUser);
    return { message: 'User registered successfully', user: userSafe };
  }


   async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    const token = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      access_token: token,
    };
  }
}