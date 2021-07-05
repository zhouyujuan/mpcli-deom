// app.js
import habo from 'habo-mp-sdk';
// habo-mp-sdk 在业务上是【非必需】的，可以用来记录业需要的用户行为日志，@haoke/gsx-mp-log 依赖了 habo-mp-sdk发送日志的能力，仅提供小程序性能相关日志打点
import {fcpStat, setAppStartTime, setLogConfig} from '@haoke/gsx-mp-log';

// 首先设置小程序名称
setLogConfig({
    // 小程序名称，必须
    mpName: 'mp-cli',
    // 临时将日志打印到线上接口
    isOnline: false,
    // 线下调试,打印setData信息，基础库版本 2.12 以上
    showSetDataInfo: true
});

// 开始计时
setAppStartTime();

App({
    onLaunch() {
        // ----> 以下代码为示例代码，根据情况删减或者保留
        wx.showLoading({
            title: 'loading',
            success() {
                // 如果页面上有loading, 或者骨架屏等，可以在出现 loading 的时候，进行fcp打点
                // 或者 在页面上最先出现的组件ready的时候使用 fcpStat()
                fcpStat();
                habo.sendPV({
                    // 根据自己的业务需要申请
                    eventId: 'xxxx'
                });
            }
        });
        // <---- 以上代码为示例代码，根据情况删减或者保留

    }
});
