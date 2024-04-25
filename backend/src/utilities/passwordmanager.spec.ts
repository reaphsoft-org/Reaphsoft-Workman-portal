// 25/04/2024 09:43
// reaphsoft-workman
// github.com/kahlflekzy

import { PasswordManager } from './passwordmanager';

describe('Password Manager', () => {
    const passwordManager: PasswordManager = new PasswordManager();

    it('should get password hash', () => {
        const key = passwordManager.getHashedKey('kahlflekzy-kahlflekzy');
        expect(key.length).toBe(128);
    });
    it('should compare two correct passwords', () => {
        const password = 'kahlflekzy-kahlflekzy';
        const key = passwordManager.getHashedKey(password);
        const isMatch = passwordManager.comparePassword(password, key);
        expect(isMatch);
    });
    it('should return false for two different passwords', () => {
        const password = 'kahlflekzy-password';
        const key = passwordManager.getHashedKey(password);
        const isMatch = passwordManager.comparePassword('kahlflekzy', key);
        expect(isMatch).toBe(false);
    });
    it('what happens when we try to hash an empty string.', () => {
        const key = passwordManager.getHashedKey('');
        // works because of the salt
        expect(key.length).toBe(128);
    });
});
