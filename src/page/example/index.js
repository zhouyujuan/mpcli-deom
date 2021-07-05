import {storeBindingsBehavior} from 'mobx-miniprogram-bindings';
import {createPage, fmpStat} from '@haoke/gsx-mp-log';
import store from '../../store/index';

const Page = createPage();
Page({
    behaviors: [storeBindingsBehavior],
    storeBindings: {
        store,
        fields: ['name'],
        actions: ['updateName']
    },
    onLoad() {
        this.setData({
            pageName: 'example'
        });
    },
    onReady() {
        wx.hideLoading();
        fmpStat();
    }
});
