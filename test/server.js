/**
 * @description jest server
 * @author zhong
 */

const request = require('supertest');
const server = require('../src/app').callback()

module.exports = request(server)