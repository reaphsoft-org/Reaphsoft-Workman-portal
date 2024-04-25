// 25/04/2024 14:15
// reaphsoft-workman
// github.com/kahlflekzy

abstract class BaseUpdateDto {
    address: string;
    fullname: string;
    serviceType: number;
}

export class UpdateUserDto extends BaseUpdateDto {
    apartment: string;
}

export class UpdateEstateManagerDto extends BaseUpdateDto {
    estate: string;
}
