import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    readonly Name: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly image: string;

    @IsBoolean()
    readonly isActive: boolean;
}
