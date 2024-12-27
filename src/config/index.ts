export enum NODE_ENV_TYPES {
  Development = "development",
  Staging = "staging",
  Production = "production",
}

const Config = {
  env1: process.env,
  env: {
    NodeEnv: process.env.NODE_ENV,
    BaseUrl: "http://localhost:3001/api/v1/",
  },
};

export default Config;
