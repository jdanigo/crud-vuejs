const env = process.env.NODE_ENV || "dev";
const appConfig = require(`./${env}`).default;

export default appConfig;