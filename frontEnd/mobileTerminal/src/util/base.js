export default{
    
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
    // 验证手机号
    checkPhone(phone){
        if(!(/^1[0-9]{10}$/.test(phone))){ 
            return false; 
        } else{
            return true;
        }
    }
}
