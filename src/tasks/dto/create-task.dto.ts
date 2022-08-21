import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString, MinDate, MinLength } from "class-validator";

export class CreateTaskDto {
    

    @IsString()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;
    
    @IsDate()
    @Type(() => Date)
    @MinDate(new Date())
    expirationDate: Date;


    @IsBoolean()
    @IsOptional()
    completed?: boolean;

}
