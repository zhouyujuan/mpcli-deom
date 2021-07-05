import prod from './prod';
import test from './test';
import dev from './dev';
import beta from './beta';
import currentEnv from '../env';

const Info = {
    prod,
    beta,
    test,
    dev
};

const accountInfo = wx.getAccountInfoSync();
const env = accountInfo.miniProgram.envVersion;

export let baseInfo = Info.prod;

if (env === 'release') {
    baseInfo = Info.prod;
}
else if (currentEnv) {
    baseInfo = Info[currentEnv];
}



