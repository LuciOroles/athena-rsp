# Game structure

The game UI is composed by 3 columns.

Users are able to `alteranate` in answering the game.

The user first ask for a new round, when the `ok` is received, a new round starts. The round is set to 9 seconds, a countdown is displayed.

Any of the `users` are able to click first, leaving the other to click it's answer.

Once the answer is given the winner will get an extra point, if no answer is given, within 9 seconds, the match is null.

The timeout or the second answer will reset the round.



## Installation

The project is 100% JavaScript and had been run with Node v.10, Webpack v.4

```bash
npm install
```

## Running 

```bash
npm run dev
