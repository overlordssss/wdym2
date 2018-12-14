const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(proxy("/game", { target: process.env.REACT_APP_PROXY }));
    app.use(proxy("/auth", { target: process.env.REACT_APP_PROXY }));
    app.use(proxy('/api', { target: process.env.REACT_APP_PROXY }));
};
