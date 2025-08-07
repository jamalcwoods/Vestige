
// Global variables for deck ID, remaining cards, score, and card ranking
let deckID; // Stores the current deck's ID from the API
let remainingCards; // Number of cards left in the deck
let score = 0; // Player's score

// Array of card ranks in order from lowest to highest
let cardRanks = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE"
]

// Corresponding score values for each card rank
let scoreRanks = [
    10,   // 2
    20,   // 3
    30,   // 4
    40,   // 5
    50,   // 6
    60,   // 7
    70,   // 8
    80,   // 9
    100,  // 10
    125,  // JACK
    150,  // QUEEN
    200,  // KING
    400   // ACE
]



// Draws 5 cards from the deck using the API and updates the UI
async function drawCards(){
    let url = `https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=5`;
    const response = await fetch(url); // Fetch 5 cards from the deck
    console.log(response);

    const data = await response.json();
    console.log(data);

    cards = [] // Reset the cards array

    // Store each drawn card in the global cards array
    for(i = 0; i < data.cards.length; i++){
        cards[i] = data.cards[i]
    }
    
    remainingCards = data.remaining; // Update remaining cards
    document.getElementById("remainingCards").innerHTML = "Cards remaining: " + remainingCards;
}


// Creates a new shuffled deck using the API and stores the deck ID
async function createDeck(callback){
    let url = "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    const response = await fetch(url); // Request a new shuffled deck
    console.log(response);

    const data = await response.json();
    console.log(data);

    deckID = data.deck_id; // Store the deck ID for future draws

    callback(); // Call the callback (drawCards)
}


// Initialize the game: create a deck and draw the first hand
createDeck(() => {
    drawCards();
})


// Scores the current hand by finding the highest card and adding its value to the score
function scoreCards(){  
    if(cards.length == 0){
        alert("Refresh the page to start a new game")
        return;
    }

    // Find the highest value card in the hand
    let highestValue = cards[0].value
    for(i = 0; i < cards.length; i++){
        if(cardRanks.indexOf(cards[i].value) > cardRanks.indexOf(highestValue)){
            highestValue = cards[i].value
        }
    }

    // Add the score for the highest card to the total score
    score += scoreRanks[cardRanks.indexOf(highestValue)]
    console.log(highestValue)
    document.getElementById("score").innerHTML = "Score: " + score;
    drawCards(); // Draw a new hand
}



// Set up button event listeners for drawing and scoring
let drawButton = document.getElementById("draw-button");
drawButton.onclick = drawCards

let scoreButton = document.getElementById("score-button");
scoreButton.onclick = scoreCards