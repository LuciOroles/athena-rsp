var referee = require('../server/referee.js');
var player = require('../server/player.js');
var gameAssets = require('../server/game.Assets.js');
var expect = require('chai').expect;

describe('Referee', function() {

    it('should exist', function() {
        referee.should.exist;
    })
    it('compare 2 players shall return a value', function() {})

    it('compare rock scissors; rock wins ', function() {
        var rock = new player(),
            sci = new player();
        rock.play(gameAssets[0]);
        sci.play(gameAssets[1]);

        expect(referee(rock, sci)).to.have.property('winner', rock)
        expect(referee(sci, rock)).to.have.property('winner', rock)

    })

    it('compare rock paper; paper wins', function() {
        var rock = new player(),
            paper = new player();
        rock.play(gameAssets[0]);
        paper.play(gameAssets[2]);

        expect(referee(rock, paper)).to.have.property('winner', paper);
        expect(referee(paper, rock)).to.have.property('winner', paper);
    })

    it('compare scissors paper; scissors wins  ', function() {
        var scissor = new player(),
            paper = new player();
        paper.play(gameAssets[2]);
        scissor.play(gameAssets[1]);

        expect(referee(scissor, paper)).to.have.property('winner', scissor);
        expect(referee(paper, scissor)).to.have.property('winner', scissor);
    })


})