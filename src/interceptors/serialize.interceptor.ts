import { UseInterceptors, NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { plainToClass } from "class-transformer";
import { UserDto } from "src/users/dtos/user.dto";

export function Serialize(dto: any){
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto:any){}
    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        //before request
        return handler.handle().pipe(
            map((data: any) => {
                //before response
                return plainToClass(this.dto,data,{excludeExtraneousValues:true})
            })
        )
    }
}