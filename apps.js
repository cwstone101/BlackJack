



let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let deck;

let canHit = true; 
let dealerScore = 0;
let playerScore = 0;



window.onload = function(){
    buildDeck();
    shuffleDeck();
    // startGame();
}

document.getElementById("startGameID").addEventListener("click", startGame);
document.getElementById("newGameID").addEventListener("click", newGame );


function newGame(){
    window.location.reload();
}


// function reset(){
    // dealerSum = 0;
    // yourSum = 0;
    // dealerAceCount = 0;
    // yourAceCount = 0;
    // document.getElementById(game).innerHTML = "";
    // document.getElementsByName().innerHTML = "";
//}

    
//     rounds = 0;
//     userScore = 0;
//     computerScore = 0;
//     ties = 0;
//     round_number.innerHTML = 'Round: '
//     ties_number.innerHTML = '0'
//     computerScore_span.innerHTML = '0'
//     userScore_span.innerHTML = '0'
//   }
// function clearBoard(game)
//     {
//         //Remove all remaining cards from here (Clean up the DIV's if need be)
//         document.getElementById(game).innerHTML = "";
//         //document.getElementById(cards).innerHTML = "";
//         //document.getElementById(card).innerHTML = "";
//     }




function buildDeck() {
    let values = ["A", "2", "3", "4", "5","6","7","8","9","10","J","Q", "K" ];
    let types = ["C", "D","H","S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); 
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame(){
    
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden)
    console.log(hidden);
    console.log(dealerSum);
    
    while (dealerSum < 17){

       let cardImg = document.createElement("img");
       let card = deck.pop();
       cardImg.src = "./cards/" + card + ".png";
         console.log(card);
       dealerSum += getValue(card);
       dealerAceCount += checkAce(card);
       document.getElementById("dealerCardAreaID").append(cardImg);

    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++){
        let cardImg = document.createElement("img");
       let card = deck.pop();
       cardImg.src = "./cards/" + card + ".png";
         console.log(card);
       yourSum += getValue(card);
       yourAceCount += checkAce(card);
       document.getElementById("playerCardAreaID").append(cardImg);
    }
    console.log(yourSum);
    document.getElementById("hitMeID").addEventListener("click", hit);
    document.getElementById("stayID").addEventListener("click", stay);

}



function hit(){
    if (!canHit){
        return;
    }
    let cardImg = document.createElement("img");
       let card = deck.pop();
       cardImg.src = "./cards/" + card + ".png";
         console.log(card);
       yourSum += getValue(card);
       yourAceCount += checkAce(card);
       document.getElementById("playerCardAreaID").append(cardImg);

       if (reduceAce(yourSum, yourAceCount) > 21){
           canHit = false
       }

}

function stay(){
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);

    canHit  = false;
    let card = hidden;

    document.getElementById("hidden").src = "./cards/" + card + ".png";                                             // "./cards" + hidden + ".png";

    let message = "";
    if (yourSum > 21){
        message = "You Lose!";
        dealerScore++;
        document.getElementById("dealerWins").innerHTML = dealerScore;
    }
    else if (dealerSum > 21){
        message = "You Win!";
        playerScore++;
        document.getElementById("playerWins").innerHTML = playerScore;

    }
    else if (yourSum == dealerSum){
        message = "Tie!!";

    }
    else if (yourSum > dealerSum){
        message = "You Win!";
        playerScore++;
        document.getElementById("playerWins").innerHTML = playerScore;

    }
    else if (yourSum < dealerSum){
        message = "You Lose!";
        dealerScore++;
        document.getElementById("dealerWins").innerHTML = dealerScore;

    }

    document.getElementById("results").innerText = message;
    alert("Game Over");
}




function getValue(card) {
    let data = card.split("-"); 
    let value = data[0];

    if (isNaN(value)) {
        if (value == "A"){
            return 11;
        }
        return 10;
    }   
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A"){
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount){
    while (playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;

    }
    return playerSum;
}


/*

array for deck of cards 

dialog tag for modals that are similar to alert/prompt    

button mechanics for instructions to appear
    onclick to throw up a prompt/alert with info in it or queryselector with an event listen and innerHTML fill of the words into a div

button mechanics for win conditions to appear 
    onlick to throw up a prompt/alert with info in it or a queryselector with an event listen and innerHTML fill of the words into a div

mechanics for shuffled deck
    math.random function to mix up the cards that are in the array so each game has a fresh randomized deck
 

must take point totals of cards along with points of face cards and ace special values
    function to convert selected cards to values for scoring

mechanics for figuring out score of the hands
    function to score the scores created by the hands at their current state

mechanics for comparing board state of hands to decide victory/loss, stay or hit, etc...
    if or while statement to evaluate hand score to see if game is done, who won, if there's still ability to hit etc...

after logic to score hands mechanism to allow player to hit or Stay 
    if or while statement to evaluate hand score to see if game is done, who won, if there's still ability to hit etc...

button mechanic for playing again either for game to keep going until player or dealer wins 5 or to start a new game
    onclick or queryselector event listen that restarts everything to a new game state

scoring to decide winning the game is a best of 5 games or first to 5
    while loop comparing scores of dealer and player...first to 3 wins declared winner or if 5 reached winner declared  




function createDeck(){

let suits = ['H', 'C', 'D', 'S'];
let ranks = ['2','3','4','5','6','7','8','9','T','J','Q', 'K', 'A'];
let deck = [];

for (let suitCounter = 0; suitCounter < 4; suitCounter++){
  for (let rankCounter = 0; rankCounter < 13; rankCounter++){
    //console.log(ranks[rankCounter] + suits[suitCounter]);
    deck.push(ranks[rankCounter] + suits[suitCounter]);
  }
  
}return deck;
}

function shuffleDeck(deck){
for(let i = 0; i < 52; i++){
  let tempCard = deck[i];
  let randomIndex = Math.floor(Math.random() * 52);
  deck[i] = deck[randomIndex];
  deck[randomIndex] = tempCard;
  }
}

let testDeck = createDeck();

shuffleDeck(testDeck);
console.log(testDeck);



    */

