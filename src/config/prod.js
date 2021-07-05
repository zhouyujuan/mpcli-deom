const currentEnv = 'prod';

/**
 * 根据项目的情况，配置你需要的域名
 * 存在多个的情况可以自行设置
 */
// const prodDomain = {
// 	API_BASE_USER_URL: 'https://m.genshuixue.com',
// 	API_BASE_URL: 'https://homework.genshuixue.com',
// 	HAO_BO_REPORT: 'https://i.gsxtj.com',
// 	API_UPLOAD: 'https://www.genshuixue.com',
// }
const prodDomain = 'https://www.genshuixue.com';

const prod = {
    currentEnv,
    domain: prodDomain
};

export default prod;