// 27/05/2024 07:00
// reaphsoft-workman
// github.com/kahlflekzy

const DOMAIN = process.env.REACT_APP_HOSTING === 'local' ? 'http://localhost' : '';
export const BACKEND_DOMAIN = `${DOMAIN}:3001`