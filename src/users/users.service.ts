import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            "id":1,
            "name":"Bhanuka Kavishka",
            "email":"bhanuka@gmail.com",
            "role":"Admin"
        },
        {
            "id":2,
            "name":"Nipun Sirimewan",
            "email":"nipun@gmail.com",
            "role":"Admin"
        },
        {
            "id":3,
            "name":"sanadaruwan",
            "email":"sande@gmail.com",
            "role":"Admin"
        },
        {
            "id":4,
            "name":"Nimsara",
            "email":"nim@gmail.com",
            "role":"Admin"
        },
        {
            "id":5,
            "name":"Leeshani",
            "email":"sanga@gmail.com",
            "role":"Admin"
        }, 
    ]
    findAll(role?: 'Intern'|'Admin'|'Developer'){
        if (role){
            const roleArray = this.users.filter(user => user.role === role);
            if(roleArray.length === 0) throw new NotFoundException ('User role not found')
            return roleArray
        }
        return this.users;
    }
    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException ('User not found')
        return user;
    }
    create(createUserDto : CreateUserDto){
        const userByHigestId = [...this.users].sort(
            (a,b) => b.id-a.id
        )
        const newUser = {
            id: userByHigestId[0].id+1,
            ...createUserDto
        }
        this.users.push(newUser)
        return newUser;
    }
    updateOne(id:number,UpdateUserDto: UpdateUserDto){
        this.users = this.users.map(user =>{
            if(user.id ===id){
                return{...user,...UpdateUserDto}
            }
            return user
        })
        return this.findOne(id);
    }
    deleteOne(id: number){
        const removeUser = this.findOne(id)
        this.users = this.users.filter(user =>user.id!==id)
        return removeUser;
    }
}
