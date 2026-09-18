import { Controller, Get, Param, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('freelancers')
  async getFreelancers(@Query('search') search: string, @Query('skill') skill: string) {
    return this.usersService.getFreelancers(search, skill);
  }

  @Get('freelancers/:id')
  async getFreelancer(@Param('id') id: string) {
    return this.usersService.getFreelancerById(id);
  }
}