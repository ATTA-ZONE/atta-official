import Vue from "vue";

/**
 * 隐藏手机号中间4位
 * 例如: 18288882912 => 182****2912;否则返回“未绑定”
 */
Vue.filter("phoneNumHidden", function(value: any) {
    if (!value || value === "") return "未绑定";
    return value.substr(0, 3) + "****" + value.substr(7);
});
// 手机号码改为：136-0303-0303
Vue.filter("phoneNumBedeck", function(value: any) {
    if (!value || value === "") return "未绑定";
    return value.substr(0, 3) + "-" + value.substr(3, 4) + "-" + value.substr(7);
});
Vue.filter("weekDate", function(value: any) {
    value = ''+value;
    if (!value || value === "") return "";
    let text: string = '';
    switch(value)
    {
        case '1':
            text = '周一';
            break;
        case '2':
            text = '周二';
            break;
        case '3':
            text = '周三';
            break;
        case '4':
            text = '周四';
            break;
        case '5':
            text = '周五';
            break;
        case '6':
            text = '周六';
            break;
        case '7':
            text = '周日';
            break;
    }
    return text;
});

// 时间戳转换
Vue.filter("dateFilter", function(value: any,dateType:any,noYMD:any){
    if(!value){
        return '-';
    }
    let date = new Date(value);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    let s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    let time:any = "";
    if(dateType == 'hms'){//如果有需求加时分秒，没有就不加
        time = Y+M+D+h+m + ':'+s;
    } else if(dateType == 'hm'){
        time = Y+M+D+h+m;
    }else{
        time = Y+M+D;
    }
    if(noYMD){
        time = h+m+s
    }
    return time;
})

// 时长换算 时间轴 => 24:00:00
Vue.filter("getDuration", function(duration: any) {
    let hour: any = "00";
    let min: any = "00";
    let sec: any = "00";
    function formatNum(n: number) {
        return n > 9 ? n : "0" + n;
    }
    if (duration >= 60 * 60) {
        hour = formatNum(Math.floor(duration / 60 / 60));
        min = formatNum(Math.floor((duration - hour * 60 * 60) / 60));
        sec = formatNum(Math.floor(duration - hour * 60 * 60 - min * 60));
    } else if (duration >= 60) {
        min = formatNum(Math.floor(duration / 60));
        sec = formatNum(Math.floor(duration - min * 60));
    } else {
        sec = formatNum(Math.floor(duration));
    }
    return hour + ":" + min + ":" + sec;
})

Vue.filter("conversionSize", function (limit: any) {
    limit = limit || 0
    let size = "";
    if (limit < 0.1 * 1024) { //如果小于0.1KB转化成B  
        size = limit.toFixed(2) + "B";
    } else if (limit < 0.1 * 1024 * 1024) {//如果小于0.1MB转化成KB  
        size = (limit / 1024).toFixed(2) + "KB";
    } else if (limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB  
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else { //其他转化成GB  
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }

    let sizestr = size + "";
    let len = sizestr.indexOf("\.");
    let dec = sizestr.substr(len + 1, 2);
    if (dec == "00") {//当小数点后为00时 去掉小数部分  
        return sizestr.substring(0, len) + sizestr.substr(len + 3, 2);
    }
    return sizestr;
});
// 中英文切换
Vue.filter("languageswitch", function(value:any,chval:any,long:any) {
    return long == "ch" ? chval : value;
});