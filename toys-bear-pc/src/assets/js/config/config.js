module.exports = {
  devEnv: {
    NODE_ENV: "development", // 本地环境
    hosturl: "http://139.9.71.135:8080"
  },
  testEnv: {
    NODE_ENV: "test", // 测试环境
    hosturl: "http://139.9.71.135:8080"
  },
  proEnv: {
    NODE_ENV: "production", // 生产环境
    hosturl: "https://api.toysbear.com"
  }
};
