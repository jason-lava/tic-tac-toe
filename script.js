

// setup playerX and playerO 
const Player = (letter) => {
    this.letter = letter;

    const getLetter = () => {
        return letter;
    };

    return { getLetter };
};

// globals
let round = 1;
let gameOver = false;

// setup displayController
const displayController = (() => {
    // setup button clicks
    const squares = document.querySelectorAll(".square");
    const restartButton = document.getElementById("restart");
    const playerTurn = document.getElementById("playerTurn");

    squares.forEach((square) => {
        square.addEventListener("click", e => {
            console.log(square.textContent);
            console.log("finish round " + `${round}`);
            
            square.disabled = true; 
            round++;

            updatePlayerTurn(round);

            console.log("now on round " + `${round}`);

            if (round > 9) {
                gameOver = true;
            };
        });
    });

    restartButton.addEventListener("click", e => {
        restart();

        squares.forEach((square) => {
            square.disabled = false; 
        });
    });

    // setup who's turn it is
    const setPlayerTurn = (message) => {
        playerTurn.textContent = message;
    };

    const updatePlayerTurn = (round) => {
        switch(round) {
            case 1: setPlayerTurn("Player X's turn"); break;
            case 2: setPlayerTurn("Player O's turn"); break;
            case 3: setPlayerTurn("Player X's turn"); break;
            case 4: setPlayerTurn("Player O's turn"); break;
            case 5: setPlayerTurn("Player X's turn"); break;
            case 6: setPlayerTurn("Player O's turn"); break;
            case 7: setPlayerTurn("Player X's turn"); break;
            case 8: setPlayerTurn("Player O's turn"); break;
            case 9: setPlayerTurn("Player X's turn"); break;
            case 10: setPlayerTurn("Game Over"); break;
        };
    };

    const updateGameboard = () => {
        console.log("updateGameboard");
    };

    // restart
    const restart = () => {
        round = 1;
        gameOver = false;
        updateGameboard();

        console.log("");
        console.log("round = " + `${round}`);
        console.log("gameOver = " + `${gameOver}`);
        console.log("");
    };



    return { setPlayerTurn, round };
})();

displayController.setPlayerTurn("Player X's turn");

// setup game controller
const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    // setup rounds
    // min is 5, max is 9


    // setup  winner checking
    // setup arrays of how winner is chosen forwards and backwards
    // straight across
    // [0, 1, 2], [3, 4, 5], [6, 7, 8] 
    // up and down
    // [0, 3, 6], [1, 4, 7], [2, 5, 8]
    // diagonal
    // [0, 4, 8], [2, 4, 6]


    // setup gameOver
    if (gameOver == true) {
        squares.forEach((square) => {
            square.disabled = true; 
        });
    }
    return { restart };
})();   