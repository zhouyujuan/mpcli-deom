const currentEnv = 'beta';

/**
 * 根据项目的情况，配置你需要的域名
 * 存在多个的情况可以自行设置
 */
// const betaDomain = {
// 	API_BASE_USER_URL: 'https://beta-m.genshuixue.com',
// 	API_BASE_URL: 'https://beta-homework.genshuixue.com',
// 	HAO_BO_REPORT: 'https://beta-i.gsxtj.com',
// 	API_UPLOAD: 'https://test.genshuixue.com',
// }

const betaDomain = 'https://beta-m.gaotuxueyuan.com'
const beta = {
    currentEnv: currentEnv,
    domain: betaDomain
};

export default beta;