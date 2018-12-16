var expect = require('chai').expect;
var assert = require('chai').assert;
var should = require('chai').should(); // needs to be excuted... is a function
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var sinon = require('sinon');
var gameWord = require('../server/game.word.js')

describe('Game World',function () {

	it('should exist', function() {
		gameWord.should.exist;
	})
	it('current play of the 2 players shall be equal');

})