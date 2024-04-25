export abstract class BaseUserDto {
    accountType: number;
    address: string;
    email: string;
    fullname: string;
    photoURL: string;
    serviceType: number;
}
export class UserDto extends BaseUserDto {
    apartment: string;
}
