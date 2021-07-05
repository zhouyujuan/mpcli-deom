const currentEnv = 'dev';

/**
 * 根据项目的情况，配置你需要的域名
 * 存在多个的情况可以自行设置
 */
// const devDomain = {
// 	API_BASE_USER_URL: 'https://dev-m.genshuixue.com',
// 	API_BASE_URL: 'https://dev-homework.genshuixue.com',
// 	HAO_BO_REPORT: 'https://test-i.gsxtj.com',
// 	API_UPLOAD: 'https://dev.genshuixue.com',
// }


// // 如果是当个域名的情况
const devDomain = 'https://dev.genshuixue.com';

const dev = {
    currentEnv,
    domain: devDomain
};

export default dev;