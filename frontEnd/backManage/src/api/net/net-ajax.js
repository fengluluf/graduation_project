import $ from 'jquery'

import {showMsg} from '../../util/base';
import {baseUrl} from '../../config'


export default {
    /****单条数据处理***/
    singleRequest:function (option){
        var laterTimer=3;
        var _this=this;
        var op=$.extend({
            url:"",
            type:"post",
            // dataType:"json",
            data: {},
            async: true,
            beforeSend:null,
            error:null,
            success:null,
            complete:null,
            callBack:null,
            callBackError:null,
            contentType: 'application/x-www-form-urlencoded',
            processData: true
        },option);
        $.ajax({
            url:op.url,
            // headers: {'Cookie' : document.cookie },
            type:op.type,
            data:op.data,
            // dataType:op.dataType,
            contentType: op.contentType,
            processData: op.processData,
            async: op.async,
            beforeSend:function () {
                if(op.beforeSend&&typeof op.beforeSend==="function"){
                    op.beforeSend();
                }
            },
            error:function (erro) {
                erro = typeof erro === 'string' ? JSON.parse(erro) : erro;
                if(op.error&&typeof op.error==="function"){
                    op.error();
                }
                if(op.callBack&&typeof op.callBack==="function"){
                    op.callBack();
                }
                // layer.open({
                //     content:"请求发送失败",
                //     skin: 'msg',
                //     time: laterTimer
                // });
            },
            success:function (sucData) {
                sucData = typeof sucData === 'string' ? JSON.parse(sucData) : sucData;
                if(sucData.resultCode===200){
                   op.success(sucData);
                }else if(sucData.resultCode===403||sucData.resultCode===401){
                    location.href = baseUrl+'/admin/index.html#/login';
                    showMsg(sucData.resultMessage);
                }else{
                    showMsg(sucData.resultMessage);
                }
                if(op.callBack&&typeof op.callBack==="function"){
                    op.callBack();
                }
            },
            complete:function (d) {
                d = typeof d === 'string' ? JSON.parse(d) : d;
                if(op.complete&&typeof op.complete==="function"){
                    op.complete(d);
                }
            }

        });
    },
}
