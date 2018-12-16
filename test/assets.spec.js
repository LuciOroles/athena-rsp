var gameAssets = require('../server/game.Assets.js');
var assert = require('chai').assert;

describe('Game Assets',function () {

	it('should exist', function() {
		gameAssets.should.exist;
	})
	it('should be 3', function() {
		gameAssets.length.should.be.equal(3);
	})

	assert(Array.isArray(gameAssets), 'assert to be an array')

	it('each object shall have a name', function(){
		for (let i =0; i<gameAssets.length; i++) {
			gameAssets[i].should.include.keys("name");
		}
	})

	it('each object shall have a wins', function(){
		for (let i =0; i<gameAssets.length; i++) {
			gameAssets[i].should.include.keys("wins");
		}
	})

})