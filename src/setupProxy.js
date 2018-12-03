const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(proxy("/game", { target: "http://localhost:4004/" }));
    app.use(proxy("/auth", { target: "http://localhost:4004/" }));
};
