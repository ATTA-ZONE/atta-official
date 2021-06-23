export function initWeb3() {
  //判断用户是否安装MetaMask钱包插件
  return new Promise((resolve, reject) => {
    if (typeof window.ethereum === "undefined") {
      //没安装MetaMask钱包进行弹框提示
      reject('请安装MetaMask')
      alert("请安装MetaMask");
    } else {
      //如果用户安装了MetaMask，要求他们授权应用登录并获取其账号
      window.ethereum.request({ method: 'eth_requestAccounts' })
        .catch((reason: any) => {
          //如果用户拒绝了登录请求
          if (reason === "User rejected provider access") {
            // 用户拒绝登录后执行语句；
          } else {
            // 本不该执行到这里，但是真到这里了，说明发生了意外
            alert("There was a problem signing you in");
          }
          reject(reason)
        })
        .then((accounts: []) => {
          resolve(accounts)
        });
    }
  })
}