var env = require("./production")

if (process.env.NODE_ENV === "DEV") {
    env = require("./development")
}

module.exports = env
