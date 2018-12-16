/**
 * 
 * @param {string} name  
 * @property player.buttons - reffer to all the buttons of the player, game action and plays/assets
 */
const player = function(name) {
    return {
        name: name,
        buttons: {
            game: [],
            assets: []
        },
        possible_actions: ["idle", "challenge", "accepted", "playing"],
        actions: [],
        score: 0,
        scoreElement: null
    }
}


export default player;
