


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
*/

