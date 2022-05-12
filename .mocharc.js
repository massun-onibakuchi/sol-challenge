"use strict"
process.env.TS_NODE_FILES = true
module.exports = {
    "allow-uncaught": true,
    diff: true,
    extension: ["ts"],
    recursive: true,
    reporter: "spec",
    require: ["ts-node/register", "hardhat/register"],
    slow: 300,
    spec: "test/**/*.test.**",
    timeout: 20000,
    ui: "bdd",
    watch: false,
    "watch-files": ["contracts/**/*.sol", "test/**/*.ts"],
}
