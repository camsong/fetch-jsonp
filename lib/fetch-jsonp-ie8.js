'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
require('es6-promise').polyfill();

var fetchJsonp = require('./fetch-jsonp');

module.exports = fetchJsonp;
exports.fetchJsonp = fetchJsonp;