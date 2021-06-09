import Vue from "vue";
/*
** 正则匹配，只返回布尔值
** 调用用方式:
**  name(value);
*/
class RegExps extends Vue {
    // 纯中文
    CReg(value:any){
        let reg = /^[\u4e00-\u9fa5]+$/;
        return Boolean(reg.test(value));
    }
    // 英文小写
    EMallReg(value:any){
        let reg = /^[a-z]+$/;
        return Boolean(reg.test(value));
    }
    // 英文大写
    EBigReg(value:any){
        let reg = /^[A-Z]+$/;
        return Boolean(reg.test(value));
    }
    // 英文大小写
    EReg(value:any){
        let reg = /^[a-zA-Z]+$/;
        return Boolean(reg.test(value));
    }
    // 英文+数字
    ENReg(value:any){
        let reg = /^[a-zA-Z0-9]+$/;
        return Boolean(reg.test(value));
    }
    // 中文+数字
    CNReg(value:any){
        let reg = /^[0-9\u4e00-\u9fa5]+$/;
        return Boolean(reg.test(value));
    }
    // 中文英文大小写
    CEAllReg(value:any){
        let reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
        return Boolean(reg.test(value));
    }
    // 中文数字英文大小写
    CENReg(value:any){
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/;
        return Boolean(reg.test(value));
    }
    // 中英文大小写数字下划线，中划线
    CENOthersReg(value:any){
        let reg = /^[a-zA-Z0-9\u4e00-\u9fa5_\\-]+$/;
        return Boolean(reg.test(value));
    }
    // 英文大小写数字下划线，中划线
    ENOthersReg(value:any){
        let reg = /^[a-zA-Z0-9_\\-]+$/;
        return Boolean(reg.test(value));
    }
    // 纯数字
    NReg(value:any){
        let reg = /^[0-9]+$/;
        return Boolean(reg.test(value));
    }
    // 手机号
    MobileReg(value:any){
        let reg = /^1(?:3[0-9]|4[5-9]|5[0-9]|6[12456]|7[0-8]|8[0-9]|9[0-9])[0-9]{8}$/;
        return Boolean(reg.test(value));
    }
    // 座机
    PhoneReg(value:any){
        let reg = /^0[1-9][0-9]{1,2}-[2-8][0-9]{6,7}$/;
        return Boolean(reg.test(value));
    }
    // 手机号+座机
    MobilePhoneReg(value:any){
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        return Boolean(reg.test(value));
    }
    // 网页链接
    HttpReg(value:any){
        let reg = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
        return Boolean(reg.test(value));
    }
    // 邮箱
    EmailReg(value:any){
        let reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        return Boolean(reg.test(value));
    }
    // 密码校验规则
    passWordReg(value:any){
        let reg = /^[A-Za-z0-9_!(),-.:;?]+$/;
        return Boolean(reg.test(value));
    }
}

export default RegExps;
