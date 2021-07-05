// import debounce from 'lodash/debounce';
import {createComponent, fcpStat} from '@haoke/gsx-mp-log';

const Component = createComponent();
Component({
    data: {
        aaa: 'aaa'
    },

    lifetimes: {
        attached() {
            this.setData({
                componentName: 'aaa'
            });
        },
        ready() {
            fcpStat();
        }
    }
});
