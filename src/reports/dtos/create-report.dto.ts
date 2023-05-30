import {IsNumber, IsString,Min,Max,IsLongitude,IsLatitude } from "class-validator"
export class CreateReportDto {

    @IsNumber()
    price: number;

    @IsString()
    make: string;

    @IsString()
    model: string;

    @IsNumber()
    @Min(1930)
    @Max(2023)
    year: number;

    @IsNumber()
    @IsLongitude()
    lng: number;
 
    @IsNumber()
    @IsLatitude()
    lat: number;
    
    @IsNumber()
    @Min(0)
    @Max(10000)
    mileage: number;
}