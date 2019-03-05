export default{
    //读取cookies
getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
},
    
    /**
     * 将时间戳格式化日期格式
     * @param timestamp  时间戳
     * @param f  格式  默认: yyyy-MM-dd hh:mm:ss
     * @returns {string}
     */
    formatDate(timestamp, f) {
        f = f ? f : 'yyyy-MM-dd hh:mm:ss';

        var time = new Date(timestamp);
        var y = time.getFullYear();//年

        var M = time.getMonth() + 1;//月
        M = M.toString().length === 1 ? '0' + M : M;

        var d = time.getDate();//日
        d = d.toString().length === 1 ? '0' + d : d;

        var h = time.getHours();//时
        h = h.toString().length === 1 ? '0' + h : h;

        var m = time.getMinutes();//分
        m = m.toString().length === 1 ? '0' + m : m;

        var s = time.getSeconds();//秒
        s = s.toString().length === 1 ? '0' + s : s;

        return f.replace('yyyy', y)
            .replace('yyyy', y)
            .replace('MM', M)
            .replace('dd', d)
            .replace('hh', h)
            .replace('mm', m)
            .replace('ss', s)
    },

    /**
     * 文章、评论发布时间  一天以内显示 xxx小时以前  超过一天显示时间
     * @param timestamp
     */
    publishTime(timestamp) {
        var oneMinute = 60 * 1000;
        var oneHour = 60 * oneMinute;
        var oneDay = 24 * oneHour;
        var oneWeek = 7 * oneDay;
        var now = + new Date();
        var diff = now - timestamp;

        if(diff < oneMinute) {
            return '刚刚';
        }else if(diff < oneHour) {
            var m = Math.floor( diff / oneMinute );
            return m + '分钟前';
        }else if(diff < oneDay) {
            var h = Math.floor( diff / oneHour );
            return h + '小时前';
        }else if(diff < oneWeek) {
            var h = Math.floor( diff / oneDay );
            return h + '天前';
        }else{
            return this.formatDate(timestamp,'yyyy-MM-dd');
        }
    },
    switchTimestamp(str) {
        var s = str.split(' ');
        var ymd = s[0].split(/[-\/]/);
        if(s[1]) {
            var hms = s[1].split(':');
            if(hms[2]) {	// yyyy-MM-dd hh:mm:ss
                return +new Date(ymd[0], ymd[1] -1, ymd[2], hms[0], hms[1], hms[2]);
            }else {	// yyyy-MM-dd hh:mm
                return +new Date(ymd[0], ymd[1] -1, ymd[2], hms[0], hms[1], 0);
            }
        }else {	// yyyy-MM-dd
            return +new Date(ymd[0], ymd[1] -1, ymd[2], 0, 0, 0);
        }
    },
    //设置echarts图表的参数
    setChartOpts(type,data) {
        var chartType = type || "bar";
        var chartData = data;
        var chartTitle = chartData.title || '';
        if(type && type === "bar" || type === "line" || type === "lineArea"){
            var dataKeys = Object.keys(chartData.data);
            if(dataKeys.length <=0 ) {
                var opts = {};
            } else {
                var xAxis = chartData.xAxis;
                var seriesArr = [];
        
                for(var key in chartData.data) {
                    var item = {};
                    item.name = key;
                    item.type = chartType === "lineArea" ? "line" : chartType;
                    if(chartType === "lineArea"){
                        item.areaStyle = {}
                    }
                    item.data = chartData.data[key];
                    seriesArr.push(item);
                }
        
                var opts = {
                    title: {
                        text: chartTitle,
                        textStyle: {
                            fontSize: 16,
                        }
                    },
                    legend: {
                        data: dataKeys,
                        align: 'right',
                        top: '40px',
                        right: '80px',
                        itemWidth: 14,
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            height: 8,
                            handleSize: 16,
                            handleIcon: 'M-292,322.2c-3.2,0-6.4-0.6-9.3-1.9c-2.9-1.2-5.4-2.9-7.6-5.1s-3.9-4.8-5.1-7.6c-1.3-3-1.9-6.1-1.9-9.3c0-3.2,0.6-6.4,1.9-9.3c1.2-2.9,2.9-5.4,5.1-7.6s4.8-3.9,7.6-5.1c3-1.3,6.1-1.9,9.3-1.9c3.2,0,6.4,0.6,9.3,1.9c2.9,1.2,5.4,2.9,7.6,5.1s3.9,4.8,5.1,7.6c1.3,3,1.9,6.1,1.9,9.3c0,3.2-0.6,6.4-1.9,9.3c-1.2,2.9-2.9,5.4-5.1,7.6s-4.8,3.9-7.6,5.1C-285.6,321.5-288.8,322.2-292,322.2z'
                        }
                    ],
                    toolbox: {
                        // y: 'bottom',
                        right: 20,
                        feature: {
                            dataView: {},
                            saveAsImage: {
                                pixelRatio: 2
                            }
                        }
                    },
                    tooltip: {},
                    xAxis: {
                        data: xAxis
                    },
                    yAxis: {},
                    grid: {
                        top: 80,
                        bottom: 80
                    },
                    series: seriesArr
                }
        
            }
            return opts;
        } else if(type && type === "pie"){
            var dataPieKeys = [];
            var seriesPieArr = [];
            var seriesPieData = [];
            var pieObj = chartData.data;
            if(pieObj.length <= 0) {
                var pieOpts = {};
            } else {
                for(var i = 0;i<pieObj.length;i++){
                    var item = {}
                    item.value = pieObj[i].count
                    item.name = pieObj[i].name
                    seriesPieData.push(item)
                }
        
                for(var i = 0;i<pieObj.length;i++){
                    var item = pieObj[i].name
                    dataPieKeys.push(item)
                }
                seriesPieArr = [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data: seriesPieData
                    }
                ];
        
                var pieOpts = {
                    title: {
                        text: chartTitle,
                        textStyle: {
                            fontSize: 16,
                        }
                    },
                    legend: {
                        data: dataPieKeys,
                        align: 'right',
                        top: '40px',
                        right: '80px',
                        itemWidth: 14,
                    },
                    toolbox: {
                        right: 20,
                        feature: {
                            dataView: {},
                            saveAsImage: {
                                pixelRatio: 2
                            }
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    grid: {
                        top: 80,
                        bottom: 80
                    },
                    series: seriesPieArr
                }
        
            }
            return  pieOpts;
        }
    },
    /**
     * localStorage存值
     * @param key
     * @param obj
     */
    setLocalData(key,obj) {
        return window.localStorage.setItem('key',JSON.stringify(obj));
    },

    localStorageEvent(){
        var local = "local";
        var storage = window.localStorage;
        // 存储
        var set = function(key,value){
            var localdata = storage.getItem(local);
            if(!localdata){
                this.init();
                localdata = storage.getItem(local);
            }
            localdata = JSON.parse(localdata);
            localdata.data[key] = value;
            storage.setItem(local,JSON.stringify(localdata));
            return localdata.data;
            console.log(localdata.data)
        }
        //读取
        var get = function(key){
            var localdata = storage.getItem(local);
            if(!localdata){
                return false;
            }
            localdata = JSON.parse(localdata);
            return localdata.data[key];
            console.log(localdata.data[key])

        };

        //移除
        var remove = function(key){
            var localdata = storage.getItem(local);
            if(!local){
                return false;
            }

            localdata = JSON.parse(localdata);
            delete localdata.data[key];
            storage.setItem(local,JSON.stringify(localdata));
            return localdata.data;
            console.log(localdata.data)

        };

        var clear = function(){
            //清除对象
            storage.removeItem(local);
        };

        var init = function(){
            storage.setItem(local,'{"data":{}}');
        };

        return {
            set : set,
            get : get,
            remove : remove,
            init : init,
            clear : clear
        };
        
    },
    /**
     * elArr为一个或多个需要减去高度的css选择器：['.header','.footer']
     */
    getMainHeight(elArr) {
        var cssHeight=0;
        for(var item of elArr){
            cssHeight += document.querySelector(item).offsetHeight || 0;
        }
        let windowHeight = document.documentElement.clientHeight;
        let mainH = windowHeight - cssHeight + 'px';
        console.log(mainH)
        return mainH;
    },
    /**
     * elArr为一个或多个需要相加高度的css选择器：['.header','.footer']
     */
    getCssHeight(elArr) {
        var cssHeight=0;
        for(var item of elArr){
            cssHeight += document.querySelector(item).offsetHeight || 0;
        }
        return cssHeight+'px';
    },
}
