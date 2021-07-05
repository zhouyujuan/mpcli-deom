/**
 * @file upload.js
 * @autho  leibin@baijia.com
 * @description 用户手动上传
 */
const path = require('path');
const {promisify} = require('util');
const {createReadStream, existsSync, stat} = require('fs');
const fetch = require('node-fetch');
const FormData = require('form-data');

const promisifyStat = promisify(stat);
const imgRelativePaths = process.argv.slice(2);

// 文件路径不能缺少
if (!imgRelativePaths.length) {
    return '请指定上传文件路径';
}

const absolutefilePaths = imgRelativePaths.map(relativePath => path.resolve(relativePath));
console.log('你所上传的文件路径为: ', absolutefilePaths);

const ALI_OSS_UPLOAD_PATH = 'http://uploader.baijia.cool/upload';


/**
 * 上传文件具体逻辑
 *
 * @param {string} filePath 文件的绝对地址
 */
async function uploadFile(filePath) {
    if (!existsSync(filePath)) {
        console.log('上传失败, 请检查上传文件路径，确实文件是否存在');
        return;
    }

    const filename = path.basename(filePath);
    const formdata = new FormData();
    const formdataInfo = {
        path: '/mp/assets/' + filename,
        // 重复上传会覆盖上一次的结果
        forceoverwrite: 1,
        // 小程序使用scope
        scope: 'mp',
        // 测试阶段使用beta环境
        env: 'production'
    };

    Object.keys(formdataInfo).forEach(key => {
        formdata.append(key, formdataInfo[key]);
    });
    formdata.append('file', createReadStream(filePath), {filename});

    const fetchOptions = {
        method: 'POST',
        body: formdata
    };
    try {
        const response = await fetch(ALI_OSS_UPLOAD_PATH, fetchOptions);
        const {code, data, msg} = await response.json();

        if (+code === 0) {
            console.log('上传成功!');
            console.log('请及时保存文件地址:', data.url);
        }
        else {
            console.log('上传失败!', msg);
        }
    }
    catch (e) {
        console.log('上传失败!', e);
    }
}


/**
 * 上传文件流程
 *
 * @param {string} absolutefilePaths 文件绝对路径
 */
async function upload(absolutefilePaths) {
    const filesNeedUpload = await filterFileNeedUpload(absolutefilePaths);

    // 存在被过滤掉的路径，提示一次
    if (filesNeedUpload.length < absolutefilePaths.length) {
        console.log('为了防止上传过多文件，不支持目录，请使用准确路径或者通配符匹配文件');
    }

    for (const filePath of filesNeedUpload) {
        uploadFile(filePath);
    }
}

/**
 * 筛掉目录，保留准确的文件路径
 *
 * @param {Array.<string>} absoluteFilePaths 多个文件路径
 * @return {Promise<Array.<string>>} 过略掉目录后的文件路径
 */
async function filterFileNeedUpload(absoluteFilePaths) {
    const filePaths = [];
    for (const filePath of absoluteFilePaths) {
        try {
            const fileStats = await promisifyStat(filePath);
            if (!fileStats.isDirectory()) {
                filePaths.push(filePath);
            }
        }
        catch (e) {
            console.error('e', e);
        }
    }
    return filePaths;
}

upload(absolutefilePaths);
