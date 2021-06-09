var baseUrl;   //这里是一个默认的url，可以没有
var env = process.env.NODE_ENV === 'development' ? 'development' :
    process.env.VUE_APP_TITLE === 'preissue' ? 'preissue' :
        process.env.VUE_APP_TITLE === 'test' ? 'test' :
            'production';
switch (env) {
    case 'development':
        baseUrl = "https://xigua.ssl.xiguawcg.com:8443"  //这里是本地的请求url
        break
    case 'test':
        baseUrl = "http://test2.ssl.xiguawcg.com:8081"  //这里是测试环境中的url
        break
    case 'preissue':   // 注意这里的名字要和步骤二中设置的环境名字对应起来
        baseUrl = "https://beta.ssl.xiguawcg.com:8443"  //这里是预发环境中的url
        break
    case 'production':
        baseUrl = "https://xigua.ssl.xiguawcg.com:8443"   //生产环境url
        break
}
export default baseUrl;