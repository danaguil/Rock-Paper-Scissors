// All code should be written in this file
// 12 global var, representing each players' move types and values(3 move types and 3 move values for each player)
// for player 1
let playerOneMoveOneType, playerOneMoveTwoType, playerOneMoveThreeType, 
    playerOneMoveOneValue, playerOneMoveTwoValue, playerOneMoveThreeValue,
    playerTwoMoveOneType, playerTwoMoveTwoType, playerTwoMoveThreeType,
    playerTwoMoveOneValue, playerTwoMoveTwoValue, playerTwoMoveThreeValue;

/* function takes a string representing...
    - a player(in form of 'Player One' or 'Player 2') 
    - 3 move types 
    - 3 more values
    - sets the correct global move var
*/
// Global Objects to store each player's moves (types and values)
function setPlayerMoves(player, moveOneType, moveOneValue, moveTwoType, moveTwoValue, moveThreeType, moveThreeValue) {
   
    // if the move types or values are missing => fail fast
    if (!moveOneType || !moveTwoType || !moveThreeType || 
        moveOneValue === undefined || moveTwoValue === undefined || moveThreeValue === undefined) {
        return; 
    } 
    if (moveOneValue < 1 || moveTwoValue < 1 || moveThreeValue < 1 ||
        moveOneValue > 99 || moveTwoValue > 99 || moveThreeValue > 99) {
        return;
    } 
    if (moveOneValue + moveTwoValue + moveThreeValue !== 99){
        return ;
    } 
    if (!isValidMoveType(moveOneType) || !isValidMoveType(moveTwoType) || !isValidMoveType(moveThreeType)){
        return;
    } else {
        if (player === 'Player One') {
            playerOneMoveOneType = moveOneType;
            playerOneMoveOneValue = moveOneValue;
            playerOneMoveTwoType = moveTwoType;
            playerOneMoveTwoValue = moveTwoValue;
            playerOneMoveThreeType = moveThreeType;
            playerOneMoveThreeValue = moveThreeValue;
        } else if (player === 'Player Two') {
            playerTwoMoveOneType = moveOneType;
            playerTwoMoveOneValue = moveOneValue;
            playerTwoMoveTwoType = moveTwoType;
            playerTwoMoveTwoValue = moveTwoValue;
            playerTwoMoveThreeType = moveThreeType;
            playerTwoMoveThreeValue = moveThreeValue;
        } else { // if invalid player is given
            return;
        }
    } 
}

function isValidMoveType(moveType){
    return moveType === 'rock' || moveType === 'paper' || moveType === 'scissors';
}

/*
    Takes a round number (1,2,or 3) 
    then compares both player's move types and values for that round
    Returns the appropriate winner
*/
function getRoundWinner(roundNumber){
    // if there was an invalid round Number
    if(roundNumber < 1 || roundNumber > 3) return null;
    // going to access the moves from the round, checks for a matching case of 1,2 or 3
    switch(roundNumber){
        case 1: 
            return getMoveWinner(playerOneMoveOneType,playerOneMoveOneValue,playerTwoMoveOneType,playerTwoMoveOneValue);
        case 2:
            return getMoveWinner(playerOneMoveTwoType,playerOneMoveTwoValue,playerTwoMoveTwoType,playerTwoMoveTwoValue);
        case 3:
            return getMoveWinner(playerOneMoveThreeType,playerOneMoveThreeValue,playerTwoMoveThreeType,playerTwoMoveThreeValue);
        default:
            return null;
        }
}

function getMoveWinner(playerOneMoveType,playerOneMoveValue,playerTwoMoveType,playerTwoMoveValue) {
    /*
        Sends the correct winner through these if conditions
    */
    if(!playerOneMoveType || !playerOneMoveValue || !playerTwoMoveType || !playerTwoMoveValue) return null;
    
   
    // Handle different move types (rock, paper, scissors)
    if (playerOneMoveType === 'rock') {
        if (playerTwoMoveType === 'scissors') return 'Player One';
        else if (playerTwoMoveType === 'paper') return 'Player Two';
    } else if (playerOneMoveType === 'paper') {
        if (playerTwoMoveType === 'rock') return 'Player One';
        else if (playerTwoMoveType === 'scissors') return 'Player Two';
    } else if (playerOneMoveType === 'scissors') {
        if (playerTwoMoveType === 'paper') return 'Player One';
        else if (playerTwoMoveType === 'rock') return 'Player Two';
    }
    
     // Check when the move types are the same (e.g., rock vs rock)
     if (playerOneMoveType === playerTwoMoveType) {
        if (playerOneMoveValue > playerTwoMoveValue) {
            return 'Player One';
        } else if (playerOneMoveValue < playerTwoMoveValue) {
            return 'Player Two';
        } else {
            return 'Tie';
        }
    }
    
}

/*
    A function called `getGameWinner`, which compares both player's move
types and values for the whole game and returns the appropriate winner (`'Player One'`, `'Player Two'`, or `'Tie'`)
*/
function getGameWinner() {
    let playerOneWins = 0;
    let playerTwoWins = 0;
    let gameTie = 0;
    
    for(let roundNumber = 1; roundNumber < 4; roundNumber++){
        let result = getRoundWinner(roundNumber);
            if(result === 'Player One') playerOneWins++;
                else if(result === 'Player Two') playerTwoWins++;
                    else if(result === 'Tie') gameTie++;
                        else return null;
    }

    if (playerOneWins > playerTwoWins) return 'Player One';
        else if (playerTwoWins > playerOneWins) return 'Player Two';
            else return 'Tie';  // Handles when both have the same number of wins
}

/*
     A function called `setComputerMoves`, which chooses three random moves for player two. 
     The move type for each move should be completely random, and the move values should be random but add up to 99.
*/
function setComputerMoves(){
    let moveType = ['rock','paper','scissors']
  
    playerTwoMoveOneType = moveType[Math.floor(Math.random() * moveType.length)];
    playerTwoMoveTwoType = moveType[Math.floor(Math.random() * moveType.length)];
    playerTwoMoveThreeType = moveType[Math.floor(Math.random() * moveType.length)];

    // Generate three random move values that add up to 99
    let moveOneValue = Math.floor(Math.random() * 98 / 3) + 2;  // Random value for the first move
    let remainingValue = 99 - moveOneValue;                     // Subtract from 99 to keep track of what's left

    let moveTwoValue = Math.floor(Math.random() * (remainingValue - 1) / 2) + 2;  // Random value for the second move
    remainingValue -= moveTwoValue;                                               // Subtract from the remaining total

    let moveThreeValue = remainingValue;                                          // The third move gets the rest to sum up to 99

    // Assign the move values to player two's moves
    playerTwoMoveOneValue = moveOneValue;
    playerTwoMoveTwoValue = moveTwoValue;
    playerTwoMoveThreeValue = moveThreeValue;

    setPlayerMoves('Player Two',playerTwoMoveOneType,playerTwoMoveOneValue,playerTwoMoveTwoType,playerTwoMoveTwoValue,
        playerTwoMoveThreeType,playerTwoMoveThreeValue
    )
}

