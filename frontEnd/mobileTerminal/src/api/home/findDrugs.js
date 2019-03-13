import $ from 'jquery'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 登录
     * @param data
     */
     drugsRes: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultCode": 200,
                    "resultJson": {
                        "pageContent": [
                            // {
                            //     "concernCount": 0,
                            //     "content": "美国",
                            //     "createDate": "2018-12-03 10:17:22",
                            //     "createTime": 1543803442505,
                            //     "editorId": 1,
                            //     "id": 80002,
                            //     "istop": 0,
                            //     "status": 0,
                            //     "title": "美国",
                            //     "updateTime": 0,
                            //     "updaterId": 0
                            // },
                            // {
                            //     "concernCount": 0,
                            //     "content": "贯彻研究驱动投资理念",
                            //     "createDate": "2018-12-01 21:21:32",
                            //     "createTime": 1543670492804,
                            //     "editorId": 1,
                            //     "id": 70000,
                            //     "istop": 0,
                            //     "status": 0,
                            //     "title": "贯彻研究驱动投资理念",
                            //     "updateTime": 0,
                            //     "updaterId": 0
                            // }
                        ],"pageNum":1,"pageSize":10,"totalPage":1
                    },
                    "resultMessage": "操作成功"
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/user-server/user/login',
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