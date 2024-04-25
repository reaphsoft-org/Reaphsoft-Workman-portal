// 25/04/2024 09:26
// reaphsoft-workman
// github.com/kahlflekzy

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { scryptSync } = require('node:crypto');

export class PasswordManager {
    private readonly salt: string = 'kahlflekzy';
    // Take a string password and returned its hashed string equivalent
    getHashedKey(password: string): string {
        const key = scryptSync(password, this.salt, 64);
        return key.toString('hex');
    }
    // Compare a plaintext password with a hashed password string
    comparePassword(plainPassword: string, hashedPassword: string): boolean {
        const key = scryptSync(plainPassword, this.salt, 64).toString('hex');
        return key == hashedPassword;
    }
}
