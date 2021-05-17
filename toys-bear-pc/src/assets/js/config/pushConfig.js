module.exports = {
  push_devEnv: {
    NODE_ENV: "development", // 本地环境
    hosturl: "http://124.71.6.26:8081"
  },
  push_testEnv: {
    NODE_ENV: "test", // 测试环境
    hosturl: "http://124.71.6.26:8081"
  },
  push_proEnv: {
    NODE_ENV: "production", // 生产环境
    hosturl: "https://api.toysbear.com"
  }
};
