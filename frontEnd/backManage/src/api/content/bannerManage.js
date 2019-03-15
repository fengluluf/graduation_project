import $ from 'jquery'
import _ from 'lodash'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 用户列表
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
                            {"date":'2019-03-13 12:00',"userName":"userName1","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName2","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName3","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName4","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName1","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName2","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName3","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName4","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName1","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName2","phoneNum":'12345678912'},
                            {"date":'2019-03-13 12:00',"userName":"userName3","phoneNum":'12345678912'},
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
    insertItem: function (data) {
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
    updateItem: function (data) {
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