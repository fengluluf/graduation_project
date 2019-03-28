import $ from 'jquery'
import _ from 'lodash'
import netAjax from '../net/net-ajax'
import {develop, baseUrl} from '../../config'

export default {

    /**
     * 用户发布的文章
     * @param data
     */
     //获取文章列表
     listInfo: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    resultCode: 200,
                    "resultJson": {
                        "count": 8,
                        "pageContent": [
                            {"date":'2019-03-13 11:00',"articleName":"articleName1","userName":'userName',"articleCon":'中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药，西药具有副作用、具有成瘾性，吃了就停不下来”，而转向求助中药降压治疗。目前研究表明有多种中药具有明确的降血压作用，如玉米须、泽泻、山楂、夏枯草、野菊花、决明子、银杏叶、葛根等，但是降压中药多有自己的中药归类。如玉米须、泽泻为利水渗湿药，具有利尿的作用；山楂为消食药，具有降脂的作用；野菊花、决明子为平肝类药物，野菊花具有清肝明目的作用，决明子则有清肝明目和润肠通便作用；以及现代研究表明具有扩张血管的作用而降血压的银杏叶、葛根。中药并非单纯针对血压值而降压，而是根据患者的体质状态进行调整而达到降压的目的，但在实际应用中药降压的过程中也存在很多误区。中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药，西药具有副作用、具有成瘾性，吃了就停不下来”，而转向求助中药降压治疗。目前研究表明有多种中药具有明确的降血压作用，如玉米须、泽泻、山楂、夏枯草、野菊花、决明子、银杏叶、葛根等，但是降压中药多有自己的中药归类。如玉米须、泽泻为利水渗湿药，具有利尿的作用；山楂为消食药，具有降脂的作用；野菊花、决明子为平肝类药物，野菊花具有清肝明目的作用，决明子则有清肝明目和润肠通便作用；以及现代研究表明具有扩张血管的作用而降血压的银杏叶、葛根。中药并非单纯针对血压值而降压，而是根据患者的体质状态进行调整而达到降压的目的，但在实际应用中药降压的过程中也存在很多误区。中药治高血压，靠不靠谱？这是很多高血压患者经常提起的问题。治疗高血压疾病的药物主要为西药类制剂，但很多患者不想服用西药，认为“高血压不能吃西药，西药具有副作用、具有成瘾性，吃了就停不下来”，而转向求助中药降压治疗。目前研究表明有多种中药具有明确的降血压作用，如玉米须、泽泻、山楂、夏枯草、野菊花、决明子、银杏叶、葛根等，但是降压中药多有自己的中药归类。如玉米须、泽泻为利水渗湿药，具有利尿的作用；山楂为消食药，具有降脂的作用；野菊花、决明子为平肝类药物，野菊花具有清肝明目的作用，决明子则有清肝明目和润肠通便作用；以及现代研究表明具有扩张血管的作用而降血压的银杏叶、葛根。中药并非单纯针对血压值而降压，而是根据患者的体质状态进行调整而达到降压的目的，但在实际应用中药降压的过程中也存在很多误区。'},
                            {"date":'2019-03-13 12:00',"articleName":"articleName1","userName":'userName',"articleCon":'articleConarticleConarticleConarticleConarticleConarticleCon'},
                            {"date":'2019-03-13 12:00',"articleName":"articleName1","userName":'userName',"articleCon":'articleConarticleConarticleConarticleConarticleConarticleCon'},
                            {"date":'2019-03-13 12:00',"articleName":"articleName1","userName":'userName',"articleCon":'articleConarticleConarticleConarticleConarticleConarticleCon'},
                            {"date":'2019-03-13 12:00',"articleName":"articleName1","userName":'userName',"articleCon":'articleConarticleConarticleConarticleConarticleConarticleCon'},
                        ]
                    }
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
    //
    getUserMsg: function (data) {
        if(develop) {
            var def = $.Deferred();
            setTimeout(function () {
                var d = {
                    resultCode: 200
                }
                def.resolve(d);
            }, 100);
            return def;
        }else {
            var def = $.Deferred();
            netAjax.singleRequest({
                url: baseUrl + '/user-server/user/one',
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