import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';
import { ChangeEmailDto } from './dto/change-email.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('change-password')
  async changePassword(@Body() body: ChangePasswordDto, @Req() req) {
    // req.user.id должен существовать, если у вас есть AuthGuard
    // но если нет JWT, можно временно передавать id в теле,
    // это менее безопасно
    const userId = req.user.id;
    return this.usersService.changePassword(userId, body);
  }

  @Delete('delete-account')
  async deleteAccount(@Body() { password }: DeleteAccountDto, @Req() req) {
    const userId = req.user.id; // при условии, что есть авторизация
    return this.usersService.deleteAccount(userId, password);
  }

  @Patch('change-email')
  async changeEmail(
    @Body() { currentPassword, newEmail }: ChangeEmailDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.usersService.changeEmail(userId, currentPassword, newEmail);
  }
}
