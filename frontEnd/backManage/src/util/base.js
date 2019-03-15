import $ from 'jquery'
//写cookies
export function setCookie(c_name, value, expiredays){
　　var exdate=new Date();
　　exdate.setDate(exdate.getDate() + expiredays);
    document.cookie=c_name+ "=" + escape(value) + ((expiredays==null) ? "" : ";expires="+exdate.toGMTString());
}
    
    //读取cookies
export function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

export function showMsg(title){
    var str = '<div class="el-message el-message--error js_popup" style="z-index: 2002;"><i class="el-message__icon el-icon-error"></i><p class="el-message__content">'
                +title
                +'</p></div>';
    $('body').append(str);
    setTimeout(()=>{
        $('.js_popup').remove();
    },2000)
}

export function getSubstring(str,len) {
let newLength = 0;
let newStr = "";
let chineseRegex = /[^\x00-\xff]/g;
let singleChar = "";
let strLength = str.replace(chineseRegex,"**").length;
for(let i=0;i < strLength;i++){
    singleChar = str.charAt(i).toString();
    if(singleChar != "" && singleChar.match(chineseRegex) !=null){
        newLength += 2;
    }else if(singleChar != ""){
        newLength += 1;
    }
    if(newLength > len){
        break;
    }
    newStr += singleChar;
}
if(newLength > len){
    newStr += "...";
}
return newStr;
}
/**
 * 将时间戳格式化日期格式
 * @param timestamp  时间戳
 * @param f  格式  默认: yyyy-MM-dd hh:mm:ss
 * @returns {string}
 */
export function formatDate(timestamp, f) {
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
}
/**
 * 文章、评论发布时间  一天以内显示 xxx小时以前  超过一天显示时间
 * @param timestamp
 */
export function publishTime(timestamp) {
    var oneMinute = 60 * 1000;
    var oneHour = 60 * oneMinute;
    var oneDay = 24 * oneHour;
    var now = + new Date();
    var diff = now - timestamp;

    if(diff < oneMinute) {
        return '刚刚';
    }else if(diff < oneHour) {
        var m = Math.floor( diff / oneMinute );
        return m + '分钟以前';
    }else if(diff < oneDay) {
        var h = Math.floor( diff / oneHour );
        return h + '小时以前';
    }else {
        return formatDate(timestamp);
    }
}

/**
 * 将日期字符串转成时间戳
 * @param str 如 2018-01-13 14:12:30
 */
export function switchTimestamp(str) {
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
}
