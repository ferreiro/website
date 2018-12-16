const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(proxy('/api', { target: 'http://localhost:5000/api' }));
    app.use(proxy('/', { target: 'http://localhost:5000/' }));
};