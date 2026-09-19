import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../database/prisma.service';
import { Role } from '@prisma/client';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
    });
    if (existing) {
      throw new BadRequestException('البريد الإلكتروني مسجل بالفعل');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email.toLowerCase(),
        passwordHash,
        fullName: dto.fullName,
        role: dto.role,
        freelancerProfile:
          dto.role === Role.FREELANCER
            ? {
                create: {
                  headline: dto.headline || 'مهندس ومستقل متخصص',
                  bio: dto.bio || '',
                  yearsOfExperience: 1,
                },
              }
            : undefined,
        clientProfile:
          dto.role === Role.CLIENT
            ? {
                create: {
                  companyName: dto.companyName || '',
                },
              }
            : undefined,
      },
      include: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });

    const tokens = this.generateTokens(user.id, user.email, user.role);
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
      tokens,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email.toLowerCase() },
      include: {
        freelancerProfile: true,
        clientProfile: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    const isMatch = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('بيانات الدخول غير صحيحة');
    }

    const tokens = this.generateTokens(user.id, user.email, user.role);
    return {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        freelancerProfile: user.freelancerProfile,
        clientProfile: user.clientProfile,
      },
      tokens,
    };
  }

  private generateTokens(userId: string, email: string, role: Role) {
    const payload = { sub: userId, email, role };
    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '7d' }),
      refreshToken: this.jwtService.sign(payload, { expiresIn: '30d' }),
      expiresIn: 7 * 24 * 60 * 60,
    };
  }
}