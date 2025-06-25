import { Body, Controller, Post } from '@nestjs/common'
import { AccessService } from './auth.service'
import { SignupInput } from './dto/register.dto'
import { SigninInput } from './dto/login.dto'

@Controller('access')
export class AccessController {
  constructor(private readonly accessService: AccessService) {}
  @Post('signup')
  handleSignup(@Body() payload: SignupInput) {
    return this.accessService.register(payload)
  }
  @Post('signin')
  handleSignin(@Body() payload: SigninInput) {
    return this.accessService.login(payload)
  }
}
