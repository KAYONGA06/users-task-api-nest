import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../users/users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signup(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.usersRepo.create({ name, email, password: hashedPassword });
    return this.usersRepo.save(user);
  }

  async login(email: string, password: string) {
    const user = await this.usersRepo.findOne({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload);

    return { access_token: token };
  }
}
