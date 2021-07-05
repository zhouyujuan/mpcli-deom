const ci = require('miniprogram-ci');
const projectConfig = require('./project.config.json');
/**
 * 获取环境参数
 * version:版本号 上传操作必填
 * desc:版本描述  上传操作必填
 * buildId: 构建id
 */
const {version = '', desc = ''} = getEnvParams(process.argv);

// 微信小程序的私有key文件存储路径
const privateKeyPath = `./private.${projectConfig.appid}.key`;

// 请求参数
const reqParams = {
  appid: projectConfig.appid,
  type: 'miniProgram',
  projectPath: './',
  privateKeyPath,
  ignores: ['node_modules/**/*', 'yarn.lock', 'package-lock.json', '.*'],
};
// 上传文件处理设置参数
const uploadParams = {
  es7: true, // "增强编译"
  minify: true, // "样式自动补全"
  autoPrefixWXSS: true, // "样式自动补全"
};

const project = new ci.Project({ ...reqParams });

(async () => {
  const uploadResult = await ci.upload({
    project,
    version,
    desc,
    setting: uploadParams,
    onProgressUpdate: console.log,
  });
  console.log('uploadResult----', uploadResult);
})();

// 任何时候都生成二维码
(async () => {
  const previewResult = await ci.preview({
    project,
    desc: '预览', // 此备注将显示在“小程序助手”开发版列表中
    setting: uploadParams,
    qrcodeFormat: 'image',
    qrcodeOutputDest: `./qrcode.jpg`,
    onProgressUpdate: console.log,
    // pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  });
  console.log('previewResult---', previewResult);
})();


/**
 * 获取node命令行参数
 * @param {array} options 命令行数组
 */
function getEnvParams(options) {
  let envParams = {};
  // 从第三个参数开始,是自定义参数
  for (let i = 0, len = options.length; i < len; i++) {
    let arg = options[i].split('=');
    envParams[arg[0]] = arg[1];
  }
  return envParams;
}
