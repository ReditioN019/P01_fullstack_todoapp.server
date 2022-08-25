import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsOptional, IsString, MaxLength, MinDate, MinLength } from "class-validator";

export class CreateTaskDto {
    
    @IsString()
    @MinLength(5, {
        message: 'La descripción es muy corta',
    })
    @MaxLength(50, {
        message: 'La descripción es muy larga',
    })
    description: string;
    
    @IsDate()
    @Type(() => Date)
    @MinDate(new Date())
    expirationDate: Date;


    @IsBoolean()
    @IsOptional()
    completed?: boolean;

}
