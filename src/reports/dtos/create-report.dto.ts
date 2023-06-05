import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Min, Max, IsLongitude, IsLatitude } from "class-validator"
export class CreateReportDto {

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    make: string;

    @ApiProperty()
    @IsString()
    model: string;

    @ApiProperty()
    @IsNumber()
    @Min(1930)
    @Max(2023)
    year: number;

    @ApiProperty()
    @IsNumber()
    @IsLongitude()
    lng: number;

    @ApiProperty()
    @IsNumber()
    @IsLatitude()
    lat: number;

    @ApiProperty()
    @IsNumber()
    @Min(0)
    @Max(10000)
    mileage: number;
}