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
                        {"date":'2019-03-13 12:00',
                        "drugsValueFir":'镇痛、解热',
                        "drugsValueSec":'感冒用药',
                        "name":'感冒清热冲剂',
                        "introduction":'感冒清热冲剂是治疗风寒感冒的常用药物，是由中药荆芥穗、桔梗、柴胡、苦杏仁等药物共同配伍加工提炼而成的中成药，方剂中的荆芥是治疗感冒的良药，具有散风、解表、透疹等多种功能。',
                        "indication":'疏风散寒，解表清热。用于风寒感冒引起头痛发热、咳嗽咽干、全身酸重、鼻流清涕',
                        "dosage":'口服：开水冲服，每次12g，每日2～3次。',
                        "precaution":'（1）素有高血压、心脏病、肝病、糖尿病、肾病等严重慢性病者，孕妇或正在接受其他治疗的患者均应在医师指导下服用。<br/>（2）应严格按照用法用量服用，婴幼儿、年老体虚患者应在医师指导下服用。<br/>（3）服用三天后，症状无缓解，发热、咳嗽加重，并出现其他严重症状时，应停药，并去医院就诊。<br/>（4）该药应放置于儿童不能触及处。<br/>（5）过敏体质者慎用。<br/>（6）不适用于风热感冒。不宜在服药期间同时服用滋补性中成药。<br/>（7）在服用本品期间应多饮开水、避风寒和忌食生冷油腻。<br/>',
                        "remark":''},
                        {"date":'2019-03-13 12:00',"userName":"userName1","phoneNum":'12345678912'},
                        {"date":'2019-03-13 12:00',"userName":"userName2","phoneNum":'12345678912'},
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