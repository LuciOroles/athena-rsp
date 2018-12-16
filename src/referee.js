/**
 * 
 * @param {*} player1 
 * @param {*} player2 
 * @returns  the wining player or null if equal 
 */
const referee = function (player1, player2) {
    var p1 = player1.play,
        p2 = player2.play;

    if (p1["name"] === p2["name"])  return null;
    if (p1["name"] === p2["wins"])  return player2["player"];
    if (p2["name"] === p1["wins"])  return player1["player"];

    return "error";
}


export default referee;