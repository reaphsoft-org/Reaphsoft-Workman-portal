// 27/05/2024 07:53
// reaphsoft-workman
// github.com/kahlflekzy

import * as path from 'path';
import * as fs from 'fs';

const DOMAIN =
    process.env.HOSTING === 'local'
        ? 'http://localhost:3000'
        : 'http://194.164.125.126';
export const HOST_IP =
    process.env.HOSTING === 'local' ? 'localhost' : '0.0.0.0';
export const FRONTEND_DOMAIN = `${DOMAIN}`;
export const BACKEND_PORT = `3001`;
export const BACKEND_DOMAIN = `${DOMAIN}:${BACKEND_PORT}`;
export const BASE_MEDIA_DIR = 'media/u';
export const MEDIA_DIR = path.join(__dirname, '..', '..', BASE_MEDIA_DIR);
if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
}
