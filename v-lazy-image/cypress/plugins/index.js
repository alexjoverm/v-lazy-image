const path = require("path");
const { startDevServer } = require("@cypress/vite-dev-server");

module.exports = (on, config) => {
  on("dev-server:start", (options) => {
    return startDevServer({
      options,
      viteConfig: {
        configFile: path.resolve(__dirname, "..", "..", "..", "playground-vue3", "vite.config.js"),
      },
    });
  });
};
