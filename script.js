
// setup playerX and playerO 
const Player = (letter) => {
    this.letter = letter;

    const getLetter = () => {
        return letter;
    };

    return { getLetter };
};

// setup displayController
const displayController = (() => {
    // setup button clicks
    const squares = document.querySelectorAll(".square");
    const restartButton = document.getElementById("restart");
    const playerTurn = document.getElementById("playerTurn");

    // add currentPlayerLetter, remove css classes for hover/active, then disable button clicking - report back to gameController round 
    squares.forEach((square) => {

        square.style.fontSize = "1px";

        square.addEventListener("click", e => {

            square.style.fontSize = "56px";
            square.textContent = gameController.getCurrentPlayerLetter();
            square.classList.remove("hover");
            square.classList.remove("active");
            square.disabled = true; 

            gameController.playRound();

        });
    });

    const stopGame = () => {
        squares.forEach((square) => {
            square.classList.remove("hover");
            square.classList.remove("active");
            square.disabled = true;
        });
    };

    // add css classes, enable square, remove any X's and O's, then tell gameController to restart
    restartButton.addEventListener("click", e => {
        
        squares.forEach((square) => {
            square.classList.add("hover");
            square.classList.add("active");
            square.disabled = false;
            square.style.fontSize = "1px";
        });

        gameController.restart();
    });

    // update html text for player turn
    const setHTMLMessage = (message) => {
            playerTurn.textContent = message;
    };

    return { setHTMLMessage, stopGame };
})();

// setup game controller
const gameController = (() => {
    const playerX = Player("X");
    const playerO = Player("O");

    let round = 1;

    // for some fun CSS rotations, target objects
    const gameboard = document.querySelector(".gameboard");
    const restartBtn = document.querySelector(".restart");

    // continuously update/check round, set the displayController html text for currentPlayer
    const playRound = () => {
        
        round++;

        if (round === 10) {
            displayController.setHTMLMessage(`Draw`);
            restartBtn.classList.add("rotate");
        } else {
            displayController.setHTMLMessage(`Player ${getCurrentPlayerLetter()}'s turn`);
        };

        checkWinner();
    };

    // based on if round is even or odd, return the current player letter
    const getCurrentPlayerLetter = () => {
        return round % 2 === 1 ? playerX.getLetter() : playerO.getLetter();
    };

    // push initial html text for displayController
    displayController.setHTMLMessage(`Player ${getCurrentPlayerLetter()}'s turn`);

    // setup board
    const index0 = document.getElementById("0");
    const index1 = document.getElementById("1");
    const index2 = document.getElementById("2");
    const index3 = document.getElementById("3");
    const index4 = document.getElementById("4");
    const index5 = document.getElementById("5");
    const index6 = document.getElementById("6");
    const index7 = document.getElementById("7");
    const index8 = document.getElementById("8");

    // setup winner checking on winning arrays
    const checkWinner = () => {
        
        // straight across - [0, 1, 2], [3, 4, 5], [6, 7, 8]
        arr0 = [index0.textContent, index1.textContent, index2.textContent];
        arr1 = [index3.textContent, index4.textContent, index5.textContent];
        arr2 = [index6.textContent, index7.textContent, index8.textContent];
        // up and down -[0, 3, 6], [1, 4, 7], [2, 5, 8]
        arr3 = [index0.textContent, index3.textContent, index6.textContent];
        arr4 = [index1.textContent, index4.textContent, index7.textContent];
        arr5 = [index2.textContent, index5.textContent, index8.textContent];
        // diagonal - [0, 4, 8], [2, 4, 6]
        arr6 = [index0.textContent, index4.textContent, index8.textContent];
        arr7 = [index2.textContent, index4.textContent, index6.textContent];

        // setup winning checks
        arr0[0] === arr0[1] && arr0[1] === arr0[2] ? gameOver(arr0[0]) : void(0);
        arr1[0] === arr1[1] && arr1[1] === arr1[2] ? gameOver(arr1[0]) : void(0);
        arr2[0] === arr2[1] && arr2[1] === arr2[2] ? gameOver(arr2[0]) : void(0);
        arr3[0] === arr3[1] && arr3[1] === arr3[2] ? gameOver(arr3[0]) : void(0);
        arr4[0] === arr4[1] && arr4[1] === arr4[2] ? gameOver(arr4[0]) : void(0);
        arr5[0] === arr5[1] && arr5[1] === arr5[2] ? gameOver(arr5[0]) : void(0);
        arr6[0] === arr6[1] && arr6[1] === arr6[2] ? gameOver(arr6[0]) : void(0);
        arr7[0] === arr7[1] && arr7[1] === arr7[2] ? gameOver(arr7[0]) : void(0);
        
    };

    // setup gameOver
    const gameOver = (winner) => {
        displayController.stopGame();
        displayController.setHTMLMessage(`Player ${winner} wins!`);

        gameboard.classList.add("rotate");
    };

    // restart
    const restart = () => {
        round = 1;
        displayController.setHTMLMessage(`Player ${getCurrentPlayerLetter()}'s turn`);

        gameboard.classList.remove("rotate");
        restartBtn.classList.remove("rotate");

        index0.textContent = "0";
        index1.textContent = "1";
        index2.textContent = "2";
        index3.textContent = "3";
        index4.textContent = "4";
        index5.textContent = "5";
        index6.textContent = "6";
        index7.textContent = "7";
        index8.textContent = "8";

    };
    
    return { round, getCurrentPlayerLetter, playRound, restart };
})();