/**
 * @file store/index.js
 * @description 状态管理中心
 * @author leibin@baijia.com
 *
 */

import {
    observable,
    action,
    flow,
    reaction
} from 'mobx-miniprogram';

export default observable({
    name: 'xxx',
    updateName: action(function updateName(name) {
        this.name = name;
    })
});

