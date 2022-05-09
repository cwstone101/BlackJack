



const audio = new Audio();
audio.src = "shuffle-cards-2.wav";

let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let deck;

let canHit = true; 
let dealerScore = 0;
let playerScore = 0;

let playerWin = 0;



window.onload = function(){
    buildDeck();
    shuffleDeck();
    // startGame();
}

document.getElementById("startGameID").addEventListener("click", startGame);
// document.getElementById("newGameID").addEventListener("click", newGame );
document.getElementById("newGameID").addEventListener("click", reset );


function newGame(){
    window.location.reload();
    document.getElementById("playerWinPic").innerHTML = "";
}


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
    if (dealerSum != 0){
        newGame();
    }
    canHit = true;
    playerWin = 0;
    document.getElementById("playerWinPic").innerHTML = "";
   
    document.getElementById("results").innerText =" ";
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden)
    console.log(hidden);
    console.log(dealerSum);
    
    while (dealerSum < 17){

       let cardImg = document.createElement("img");
       let card = deck.pop();
       cardImg.src = "./cards/" + card + ".png";
       cardImg.setAttribute("class", "cardImages");
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
            console.log(cardImg);
       cardImg.setAttribute("class", "cardImages");
         console.log(card);
       yourSum += getValue(card);
       yourAceCount += checkAce(card);
       document.getElementById("playerCardAreaID").append(cardImg);
    }
    console.log(yourSum);
    

}
document.getElementById("hitMeID").addEventListener("click", hit);
document.getElementById("hitMeID").addEventListener("click", hitMeAudio);
document.getElementById("stayID").addEventListener("click", stay);
document.getElementById("instructionsID").addEventListener("click", instructions );
document.getElementById("newGameID").addEventListener("click", newGameAudio);

function instructions(){
    alert("The classic game of blackjack--review the game at https://en.wikipedia.org/wiki/Blackjack");

}

function hit(){
    if (!canHit){
        return;
    }
    let cardImg = document.createElement("img");
       let card = deck.pop();
       cardImg.src = "./cards/" + card + ".png";
         console.log(card);
         cardImg.setAttribute("class", "cardImages"); 
       yourSum += getValue(card);
       yourAceCount += checkAce(card);
       document.getElementById("playerCardAreaID").append(cardImg);

       if (reduceAce(yourSum, yourAceCount) > 21){
           canHit = false
       }

}

function hitMeAudio(){
    let audio = new Audio("hit_with_Pan.wav");
    audio.play();

}

function newGameAudio(){
    let audio = new Audio("trumpet_intro.wav");
    audio.play();
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
        playerWin++;
        document.getElementById("playerWins").innerHTML = playerScore;

    }
    else if (yourSum == dealerSum){
        message = "Tie!!";

    }
    else if (yourSum > dealerSum){
        message = "You Win!";
        playerScore++;
        playerWin++;
        document.getElementById("playerWins").innerHTML = playerScore;

    }
    else if (yourSum < dealerSum){
        message = "You Lose!";
        dealerScore++;
        document.getElementById("dealerWins").innerHTML = dealerScore;

    }

    if (playerWin > 0 ){
        playerWinAudio();
        document.getElementById("playerWinPic").innerHTML = '<img src="thumbsUp.jpg"></img>';

    }

    document.getElementById("results").innerText = message;
    document.getElementsByClassName("dealerArea").innerText = message;
    alert("Game Over");
    yourSum = 0;
    dealerSum = 0;
    console.log(dealerScore);
    console.log(playerScore);
    doneYet();
    // document.getElementById("results").innerText =" ";
}

function playerWinAudio(){
    let audio = new Audio("applause.wav");
    audio.play();
}


function reset() {
    document.querySelectorAll('.cardImages').forEach(el=>el.remove());
    //document.querySelectorAll('.cardImages').forEach(el=>el.setAttribute("src", "cardImg"));
    //document.getElementById("hidden").append("src", "./cards/BACK.png");
    let b = document.querySelector("#hidden");
    console.log(b);

    b.setAttribute("src", "./cards/BACK.png");
    console.log(b);    
    // document.querySelector('hidden').attributes('src', "./cards/BACK.png");

}

function doneYet(){
    if (dealerScore === 5){
        alert("You have lost the Match the Dealer has won 5 games");
        newGame();
    }
    else if (playerScore === 5){
        alert("You have won the Match you have won 5 games");
        newGame();
    }
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
 // let picCheck = document.getElementById(playerCardAreaID).childNodes;
    //     for (let i =0; i < picCheck.length; i++){
    //         if (picCheck[i].getAttribute('src') != null){
    //             return true;
    //         }
    //         return false;
    //     }   



