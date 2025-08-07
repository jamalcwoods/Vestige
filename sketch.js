
// Array to hold the current set of cards to display
let cards = []



// p5.js setup function: initializes the canvas and drawing modes
function setup(){
    createCanvas(800,800); // Create a canvas of size 800x800 pixels
    rectMode(CENTER);      // Draw rectangles from their center
    textAlign(CENTER);     // Center-align text
}


// Draws an empty card slot at position (x, y)
function drawEmptyCardSlot(x,y){
    stroke(255);      // White border
    fill(0);          // Black fill
    rect(x,y,100,160); // Draw rectangle for card slot
}


// Draws a card at position (x, y) with the given number and suit
function drawCard(x,y,num,suit){
    fill(255); // White card background
    rect(x,y,100,160); // Card rectangle
    // Set text color based on suit
    if(suit == "HEARTS" || suit == "DIAMONDS"){
        fill(255,0,0); // Red for hearts/diamonds
    } else {
        fill(0);       // Black for spades/clubs
    }
    textSize(20)        // Set text size
    text(suit,x,y);      // Draw suit name
    text(num,x,y + 30);  // Draw card value below suit
}


// p5.js draw function: draws the current hand of cards or empty slots
function draw(){
    background(0); // Clear background to black
    for(i = 0; i < 5; i++){
        // Calculate x position for each card/slot
        let x = width/8 + (i * (width/4) * 0.75);
        let y = height/2;
        if(cards[i] != undefined){
            // Draw the card if it exists
            drawCard(x, y, cards[i].value, cards[i].suit);
        }  else {
            // Draw an empty slot if no card
            drawEmptyCardSlot(x, y)
        }
    }
}