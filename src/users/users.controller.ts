import { Body, Controller,Post,Get,Patch,Param,Query, Delete, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto} from './dtos/update-user.dto';
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
 
  @Post('signup')
  createUser(@Body() body:CreateUserDto){
    return this.usersService.create(body.email,body.password);
  }

  @Get()
  findAllUsers(@Query('email') email:string){
    return this.usersService.find(email);
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
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
