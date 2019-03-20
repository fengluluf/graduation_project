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
                        {"date":'2019-03-13 12:00',"drugsSort":'抗感染类药物',},
                        {"date":'2019-03-13 12:00',"drugsSort":"心血管系统药物"},
                        {"date":'2019-03-13 12:00',"drugsSort":"消化系统药物"},
                        {"date":'2019-03-13 12:00',"drugsSort":'呼吸系统药物',},
                        {"date":'2019-03-13 12:00',"drugsSort":"神经系统用药"},
                        {"date":'2019-03-13 12:00',"drugsSort":"治疗精神障碍药物"},
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
                    "resultCode": 200,
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
}