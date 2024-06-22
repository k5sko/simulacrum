const withTM = require("next-transpile-modules")(["@jquesnelle/crt-terminal"]);

module.exports = withTM({
  reactStrictMode: true,
  env: {
    OPEN_API_KEY: '',
  }
});
