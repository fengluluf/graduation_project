import $ from 'jquery'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 药品一级分类
     * @param data
     */
     drugsRes: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    "resultcode":"0000","data":{"result":"00","text":"查询成功","array":[{"id":1,"drugname":"抗感染类药物"},{"id":2,"drugname":"心血管系统药物"},{"id":3,"drugname":"消化系统用药"},{"id":4,"drugname":"呼吸系统药物"},{"id":5,"drugname":"神经系统用药"},{"id":6,"drugname":"治疗精神障碍药物"},{"id":7,"drugname":"镇痛、解热、抗炎、抗痛风药"}]}
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/drug/getFirst',
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