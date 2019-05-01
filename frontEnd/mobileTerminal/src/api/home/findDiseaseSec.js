import $ from 'jquery'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 疾病二级分类
     * @param data
     */
     getSortList: function (data) {
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
                url: baseUrl + '/disease/getSecond',
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
    //疾病三级分类查询
    getDiseaseList: function (data) {
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
                url: baseUrl + '/disease/getThird',
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