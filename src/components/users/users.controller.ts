import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { UserService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('users')
export class UserController {
  constructor(private readonly accountService: UserService) {}



  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    return this.accountService.create(createUser)
  }



  @Get('all')
  listAll() {
    return this.accountService.findAll()
  }



  @Get('profile/:userId')
  getById(@Param('userId') userId: string) {
    return this.accountService.findOne(userId)
  }



  @Patch('modify/:userId')
  edit(@Param('userId') userId: string, @Body() updateUser: UpdateUserDto) {
    return this.accountService.update(userId, updateUser)
  }

  

  @Delete('delete/:userId')
  remove(@Param('userId') userId: string) {
    return this.accountService.remove(userId)
  }
}
