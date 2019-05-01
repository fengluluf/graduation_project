import $ from 'jquery'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 疾病详情查询
     * @param data
     */
    //药品详情查询
    getDiseaseDetail: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/disease/diseaseInfo',
                data: data,
                type: 'POST',
                success: function (d) {
                    def.resolve(d)
                },
                error: function (d) {
                    def.resolve(d)
                }
            })
            return def;
        }
    },

}