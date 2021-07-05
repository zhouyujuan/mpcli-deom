import {
    DEFAULT_DOMAIN,
    SHOW_LOADING_TIME,
    MODEL_CONFIRM_COLOR,
    MODEL_CONFIRM_TEXT,
    SUCCESS_RES_CODE,
    EXPIRED_HTTP_CODE,
    EXPIRED_RES_CODE,
    GET_NETWORK_TYPE_FAIL,
    NETWORK_IS_NONE,
    REQUEST_FAIL,
    PATH_IS_NULL
} from './constants';

const AUTH_TOKEN_KEY = 'authToken';

export default function baseRequest(data) {
    const {
        path,
        domain = DEFAULT_DOMAIN,
        params = {},
        method = 'GET',
        allowCode = [],
        loadingTitle = '加载中'
    } = data || {};
    if (!path) {
        const pathErrRes = {code: PATH_IS_NULL, msg: 'path为空'};
        return Promise.resolve([pathErrRes]);
    }

    const {hideLoading, showErrModel, ...restParams} = params || {};
    const authToken = wx.getStorageSync(AUTH_TOKEN_KEY) || '';

    return new Promise((resolve, reject) => {
        wx.getNetworkType().then(network => {
            if (network.networkType === 'none') {
                reject({
                    code: NETWORK_IS_NONE,
                    msg: '暂无网络，请检查网络'
                });
            } else {
                // 接口请求过慢的时候显示loading
                let flag = true;
                // 关闭loading
                if (hideLoading) {
                    flag = false;
                }
                const sto = setTimeout(() => {
                    if (flag) {
                        wx.showLoading({
                            title: loadingTitle
                        });

                        flag = false;
                    }

                    clearTimeout(sto);
                }, SHOW_LOADING_TIME);

                // 拼接Url
                const url = `${domain || DEFAULT_DOMAIN}${path}`;

                // 发送请求
                wx.request({
                    url,
                    data: restParams,
                    method,
                    header: {
                        'auth-token': authToken
                    },
                    success(res) {
                        const {data: _data, statusCode} = res || {};
                        const {code, msg} = _data || {};
                        // authToken已过期
                        if (statusCode === EXPIRED_HTTP_CODE && code === EXPIRED_RES_CODE) {
                            // 清除authToken
                            wx.setStorage({
                                key: AUTH_TOKEN_KEY,
                                data: ''
                            });

                            reject({code, msg: 'authToken已过期'});
                        } else {
                            if (!flag) {
                                wx.hideLoading();
                            }

                            if (
                                code === SUCCESS_RES_CODE
                                || (allowCode && Array.isArray(allowCode) ? allowCode : []).indexOf(code) !== -1
                            ) {
                                resolve(_data);
                            }

                            reject({code, msg});
                        }
                    },
                    fail(err) {
                        if (!flag) {
                            wx.hideLoading();
                        }

                        reject({
                            code: REQUEST_FAIL,
                            msg: err.errMsg || '无法获取数据'
                        });
                    },
                    complete() {
                        flag = false;
                    }
                });
            }
        }).catch(() => {
            reject({
                code: GET_NETWORK_TYPE_FAIL,
                msg: '网络状态异常，请检查网络'
            });
        });
    }).then(res => {
        return [null, res];
    }).catch(error => {
        if (showErrModel) {
            wx.showModal({
                content: error.msg,
                showCancel: false,
                confirmText: MODEL_CONFIRM_TEXT,
                confirmColor: MODEL_CONFIRM_COLOR
            });
        }

        return [error];
    });
}
