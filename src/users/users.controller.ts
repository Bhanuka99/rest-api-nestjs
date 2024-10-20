import { Body, Controller , Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Get()  //GET/users or /users?role=value
    findAll(@Query('role') role?: 'Intern'|'Admin'|'Developer'){
        return this.usersService.findAll(role);
    }

    @Get(':id')  //GET/users/:id
    findOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.findOne(id);
    }

    @Post()  //POST/users
    create(@Body(ValidationPipe) createUserDto: CreateUserDto){
        return this,this.usersService.create(createUserDto)
    }

    @Patch(':id')  //PATCH/users/:id
    updateOne(@Param('id', ParseIntPipe) id: number , @Body(ValidationPipe) updateUserDto: UpdateUserDto){
        return this.usersService.updateOne( id, updateUserDto );
    }

    @Delete(':id')  //DELETE/users/:id
    deleteOne(@Param('id', ParseIntPipe) id: number){
        return this.usersService.deleteOne(id);
    }

}
