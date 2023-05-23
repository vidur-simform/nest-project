import { BadRequestException, Injectable ,NotFoundException} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}
    create(email:string,password:string){
         const user = this.repo.create({email,password});
         return this.repo.save(user);
    }
    find(email:string){
        if(!email)
            throw new BadRequestException('Please provide email.');
        return this.repo.find({where:{email:email}});
    }
    findOne(id:number){
        return this.repo.findOneBy({id});
    }
    async update(id:number,attrs:Partial<User>){
        const user = await this.repo.findOneBy({id});
        if(!user){
            throw new NotFoundException('User not found!');
        }
        Object.assign(user,attrs);
        return this.repo.save(user);
    }
    async remove(id :number){
        const user = await this.repo.findOneBy({id});
        if(!user){
            throw new NotFoundException('User not found!');
        }
        return this.repo.remove(user);
    }
}
