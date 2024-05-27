// 27/05/2024 07:53
// reaphsoft-workman
// github.com/kahlflekzy

const DOMAIN = process.env.HOSTING === 'local' ? 'http://localhost' : '';
export const FRONTEND_DOMAIN = `${DOMAIN}:3000`;
