import $ from 'jquery'
import { Dialog } from 'vant';

export default {
    /****单条数据处理***/
    singleRequest:function (option){
        var laterTimer=3;
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
            contentType: 'application/x-www-form-urlencoded',
            processData: true
        },option);
        $.ajax({
            url:op.url,
            type:op.type,
            data:op.data,
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
            },
            success:function (sucData) {
                sucData = sucData && typeof sucData === 'string' ? JSON.parse(sucData) : sucData;
                if(sucData.resultcode==="0000"){
                   op.success(sucData);
                }else if(sucData.result==="0000"){
                    op.success(sucData);
                }
                else{
                    Dialog.alert({
                        message: sucData.data.text
                    }).then(() => {
                    // on close
                    });
                }
                if(op.callBack&&typeof op.callBack==="function"){
                    op.callBack();
                }
            },
            complete:function (d) {
                d = d && typeof d === 'string' ? JSON.parse(d) : d;
                if(op.complete&&typeof op.complete==="function"){
                    op.complete(d);
                }
            }

        });
    },
}
