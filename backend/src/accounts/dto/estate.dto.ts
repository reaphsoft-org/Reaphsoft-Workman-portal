// 25/04/2024 14:02
// reaphsoft-workman
// github.com/kahlflekzy

import { BaseUserDto } from './user.dto';

export class EstateDto extends BaseUserDto {
    estate: string;
    houses: { number: string; name: string; id: string }[];
}
