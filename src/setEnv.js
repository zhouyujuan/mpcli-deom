const {createWriteStream} = require('fs');
const {resolve} = require('path');
// 当前环境变量
const nodeEnv = process.env.NODE_ENV || 'prod';

// 要写入的内容
const content = `const currentEnv = '${nodeEnv}';
export default currentEnv;
`;

// 创建流
const fileName = resolve(__dirname, './env.js');
const ws = createWriteStream(fileName, {
    encoding: 'utf8',
    autoClose: true,
});

ws.on('open', function () {
    console.log(`正在设置环境变量....`);
});

ws.on('finish', function () {
    console.log(`设置环境变量成功: ${nodeEnv || '线上环境'}`);
    process.exit();
});

ws.on('error', function () {
    process.exit(1);
});

ws.write(content);

ws.end();
