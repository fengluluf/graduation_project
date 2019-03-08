import $ from 'jquery'

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
                if(sucData.resultCode===200){
                   op.success(sucData);
                }
                else if(sucData.resultCode===500){
                    Indicator.close();
                    Toast({
                        message: sucData.resultMessage,
                    });
                    op.success(sucData);
                }else if(sucData.resultCode===403||sucData.resultCode===401){
                    Toast({
                        message: sucData.resultMessage,
                    });
                }else{
                    Indicator.close();
                    Toast({
                        message: sucData.resultMessage,
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
    /****data 必须是数组 多条请求列队***/
    multipleRequests:function (arr) {
        var laterTimer=3;
         if(arr&&arr.length>0){
           var index=0;
           arr[index].callBack=function () {
                  index++;
                 if(index<arr.length){
                     netSever.singleRequest(arr[index]);
                 }
             }
           netSever.singleRequest(arr[index]);
        }else{
             // layer.open({
             //     content: "请使用单条请求",
             //     skin: 'msg',
             //     time: laterTimer
             // });
       }
    }
}
