import $ from 'jquery'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {
    /**
     * 用户发表文章
     * @param data
     */
    singleArticleRequest: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultCode": 200,
                    "resultJson": {
                        "pageContent": [
                        ],
                    },
                    "resultMessage": "操作成功"
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/backArticle/getInfos',
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
    /**
     * 评论列表
     * @param data
     */
     commentsRes: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultCode": 200,
                    "resultJson": {
                        "pageContent": [
                           
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