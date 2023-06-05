import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString,IsOptional } from "class-validator"
export class UpdateUserDto {
    @ApiProperty()
    @IsEmail()
    // @IsOptional()
    email: string;
    
    @ApiProperty()
    @IsString()
    // @IsOptional()
    password: string;
}