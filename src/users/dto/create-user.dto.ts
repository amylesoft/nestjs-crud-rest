import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    @ApiProperty({
        description: 'User phone number',
        default: '1234567890',
    })
    readonly phoneNo: string;

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
