module.exports = {
  devEnv: {
    NODE_ENV: "development", // 本地环境
    hosturl: "http://124.71.6.26:8089",
    loginUrl: "http://124.71.6.26:8080/#/me",
    wsBaseUrl: "ws://124.71.6.26:8080/ws?UserId=",
    appkey: "bmdehs6pbfaas"
    // hosturl: "http://im.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
    // hosturl: "https://www.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  },
  testEnv: {
    NODE_ENV: "test", // 测试环境
    hosturl: "http://124.71.6.26:8089",
    loginUrl: "http://124.71.6.26:8080/#/me",
    wsBaseUrl: "ws://124.71.6.26:8080/ws?UserId=",
    appkey: "bmdehs6pbfaas"
    // hosturl: "https://www.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  },
  proEnv: {
    NODE_ENV: "production",
    // 老测试环境
    hosturl: "http://im.toysbear.com",
    loginUrl: "https://www.toysbear.com/#/me",
    wsBaseUrl: "wss://impush.toysbear.com/ws?UserId=",
    // appkey: "pkfcgjstp5888"
    appkey: "bmdehs6pbfaas"

    // 新测试环境
    // hosturl: "http://124.71.6.26:8080",
    // loginUrl: "http://124.71.6.26:8080/#/me",
    // wsBaseUrl: "ws://124.71.6.26:8090/ws?UserId="
    // 生产环境
    // hosturl: "http://1.14.158.14:8081",

    // hosturl: "https://www.toysbear.com",
    // loginUrl: "https://www.toysbear.com/#/me",
    // wsBaseUrl: "wss://impush.toysbear.com/ws?UserId="
  }
};
