/**
 * 工具库
 * 写法：export const fn1 = function () {xxx}; export fn2 = function () {}
 * 使用：import { fn1 } from 'xxx';fn1();
 */
/**
 * 深拷贝
 */
export const clone = function(obj: any) {
    let copy: any;
    if (null === obj || "object" !== typeof obj) {
        // Handle the 3 simple types, and null or undefined
        return obj;
    } else if (obj instanceof Date) {
        // Handle Date
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    } else if (obj instanceof Array) {
        // Handle Array
        copy = [];
        for (let i = 0, len = obj.length; i < len; i++) {
            copy[i] = clone(obj[i]);
        }
        return copy;
    } else if (obj instanceof Object) {
        // Handle Object
        copy = {};
        for (let attr in obj) {
            if (obj.hasOwnProperty(attr)) {
                copy[attr] = clone(obj[attr]);
            }
        }
        return copy;
    } else {
        return copy;
    }
};

/**
 * 函数节流
 * @param method 需要节流的函数
 * @param delay 延迟时间
 * @param duration 规定时间内执行一次函数
 */
export const throttle = function(method: any, delay: any, duration: any) {
    var timer: any = null;
    var begin: any = new Date();
    return function(this:any) {
        var context = this,
            args = arguments;
        var current: any = new Date();
        clearTimeout(timer);
        if (current - begin >= duration) {
            method.apply(context, args);
            begin = current;
        } else {
            timer = setTimeout(function() {
                method.apply(context, args);
            }, delay);
        }
    };
};

/**
 * 函数防抖
 * @param fn 需要防抖的函数
 * @param delay 延迟时间
 */
export const debounce = function(fn:any, delay:any) {
    let timer:any = null;
    return function (this:any) {
        let context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    }
}

/**
 * 寻找子代的数据
 * @param res 查询的对象
 * @param prop 获取具体的属性对象集
 */
export const findChild = function(res: any, prop?: Array<string>) {
    let nowData:Array<any> = []
    if (res.children && res.children.length > 0) {
        res.children.forEach((item:any) => {
            nowData = nowData.concat(findChild(item, prop))
        })
    } else {
        let data: any = {}
        prop && prop.forEach((key:any) => {
            data[key] = res[key]
        })
        nowData.push({value:res.value, title:res.title, data: data})
    }
    return nowData
}

/**
 * 判断后端返回的数据
 * @param resData 要判断的返回数据
 */
export const judgeResponseData = function(resData: any) {
    if(!resData){ // null undefined
        return false;
    }
    else if(resData && typeof(resData) == 'object'){
        if(resData instanceof Array){ //array
            if(resData.length > 0){
                return true;
            }else{
                return false;
            }
        }
        else if(resData instanceof Object){ //object
            let arr = Object.keys(resData);
            if(arr.length > 0){
                return true;
            }else{
                return false;
            }
        }
    }

}
/**
 * 去除字符串左右空格
 */
export const trim = function(str:any) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

// 时间戳转换为yyyy-mm-dd  或者加时间hh：mm：ss格式
/**
 *
 * @param value 需要转换的时间戳
 * @param type 是否需要加上时分秒
 */
export const dateSwitch = function(value: any,type?:any){
    if (!value) return
    let date = new Date(value);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + '';
    let h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':';
    let m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes()) + ':';
    let s = (date.getSeconds() < 10 ? '0'+(date.getSeconds()) : date.getSeconds());
    let time:any;
    if(type){
        time = Y+M+D+ ' ' +h+m+s;
    }else{
        time = Y+M+D;
    }
    return time;
}