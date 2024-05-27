// 27/05/2024 07:53
// reaphsoft-workman
// github.com/kahlflekzy

import * as path from 'path';
import * as fs from 'fs';

const DOMAIN = process.env.HOSTING === 'local' ? 'http://localhost' : '';
export const FRONTEND_DOMAIN = `${DOMAIN}:3000`;
export const MEDIA_DIR = path.join(__dirname, '..', '..', 'media/u');
if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
}
