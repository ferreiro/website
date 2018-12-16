const proxy = require('http-proxy-middleware');

function sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
}

module.exports = function(app) {
    // Delay the setup of the proxy...
    // We want to way till the server has been mounted
    sleep(1000, function() {
        // executes after one second, and blocks the thread
        app.use(proxy('/api', { target: 'http://localhost:5000/api' }));
        app.use(proxy('/', { target: 'http://localhost:5000/' }));
    });
};