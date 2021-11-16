import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    @Length(0, 20)
    @ApiProperty({
        description: 'User first name',
        default: 'Jay',
    })
    readonly firstName: string;

    @IsString()
    @IsNotEmpty()
    @Length(0, 20)
    @ApiProperty({
        description: 'User last name',
        default: 'Khant',
    })
    readonly lastName: string;
}
