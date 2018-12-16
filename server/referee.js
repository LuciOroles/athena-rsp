/* 
	receive the 2 player choices and returns the winner and loser
*/

var referee = function referee(player1, player2) {

    var p1 = player1.plays[player1.current_play],
        p2 = player2.plays[player2.current_play];

    // console.log(p1.name, p2.name);
    if (p1["name"] === p2["name"]) return null;
    if (p1["name"] === p2["wins"])
        return {
            winner: player2,
            loser: player1
        };
    if (p2["name"] === p1["wins"])  
       return {
            winner: player1,
            loser: player2
        };

    return "error";
}


module.exports = referee;