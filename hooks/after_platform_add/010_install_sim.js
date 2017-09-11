#!/usr/bin/env node

// shim to fix bug in cordova-ios <= 4.4.0
// see https://forum.ionicframework.com/t/error-cannot-read-property-replace-of-undefined/94532/20

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var root = process.argv[2];
var platform = process.env.CORDOVA_PLATFORMS;

function puts(error, stdout, stderr) {
  console.log(stdout);
}

function installCordovaIosSim() {
  exec("cd platforms/ios/cordova && npm install ios-sim", puts)
}

if (platform === 'ios') {
  installCordovaIosSim();
}