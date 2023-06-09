import { Body, Controller,Post,Get,Patch,Param,Query, Delete, UseInterceptors, ClassSerializerInterceptor, Session ,UseGuards} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto} from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './entities/user.entity';
import { AuthGuard } from '../guards/auth.guard';
import {  ApiTags } from '@nestjs/swagger';

@Controller('auth')
@Serialize(UserDto)
@ApiTags("User")
export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly authService: AuthService) {}
 
  @Post('signup')
  async signup(@Body() body:CreateUserDto, @Session() session :any){
    const user = await this.authService.signup(body.email,body.password);
    session.userId = user.id;
    return user;
  }
  @Post('signin')
  async signin(@Body() body:CreateUserDto, @Session() session :any){
    const user = await this.authService.signin(body.email,body.password);
    session.userId = user.id;
    return user;
  }
  @Post('signout')
  signOut(@Session() session :any){
    session.userId = null;
  }
  @UseGuards(AuthGuard)
  @Get('/whoami')
  whoAmI(@CurrentUser() user:User){
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email:string){
    return this.usersService.find(email);
  }

  @Get(':id')
  findUser(@Param('id') id:string){
    return this.usersService.findOne(parseInt(id));
  }
  @Delete(':id')
  removeUser(@Param('id') id:string){
    return this.usersService.remove(parseInt(id));
  }

  @Patch(':id')
  updateUser(@Param('id') id :string ,@Body() body:UpdateUserDto){
    return this.usersService.update(parseInt(id),body);
  }
}
