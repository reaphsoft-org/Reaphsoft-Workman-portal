export class CreateUserDto {
    readonly email: string;
    readonly password: string;
    readonly fullname: string;
    readonly apartment: string;
    readonly address: string;
    readonly serviceType: number;
}
