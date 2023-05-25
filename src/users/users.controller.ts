import { Body, Controller,Post,Get,Patch,Param,Query, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto} from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { Serialize, SerializeInterceptor } from 'src/interceptors/serialize.interceptor';

@Controller('auth')
@Serialize(UserDto)

export class UsersController {
  constructor(private readonly usersService: UsersService,private readonly authService: AuthService) {}
 
  @Post('signup')
  signup(@Body() body:CreateUserDto){
    return this.authService.signup(body.email,body.password);
  }
  @Post('signin')
  signin(@Body() body:CreateUserDto){
    return this.authService.signin(body.email,body.password);
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
