import $ from 'jquery'
import _ from 'lodash'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 药品一级分类管理
     * @param data
     */
    //获取表格信息
    listInfo: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultCode": 200,
                    "resultJson": {
                        "count": 8,
                        "pageContent": [
                        {"date":'2019-03-13 12:00',"diseaseSort":'内科疾病',},
                        {"date":'2019-03-13 12:00',"diseaseSort":"外科疾病"},
                        {"date":'2019-03-13 12:00',"diseaseSort":"妇产科疾病"},
                        {"date":'2019-03-13 12:00',"diseaseSort":'儿科疾病',},
                        {"date":'2019-03-13 12:00',"diseaseSort":"传染病"},
                        {"date":'2019-03-13 12:00',"diseaseSort":"眼科疾病"},
                        ]
                    }
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/business-server/news/bySelf',
                data:data,
                type: 'GET',
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
    deleteAll: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultcode": '0000',
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/business-server/news/bySelf',
                data:data,
                type: 'GET',
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
    //确认新增
    sendData: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultcode": '0000',
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/backDrug/addFirst',
                data:data,
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