/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


window.onload = init;
var cardsList =  document.getElementsByClassName("card");
var firstClick = 0;
var firstIndexSelected = 0;
var Moves = 0;
var TotalMatches = 0;

var isIgnore = false;
function init() {
    // for(let i = 0 ;  i < cardsList.length ; i++ ){
    //     cardsList[i].onclick = cardClicked;
    // }
  
}

function cardClicked(i) {

    if(isIgnore)
    return; // return if user click third card and event for second not finished yet 

  isIgnore = true;
  //if first card to open if this card is not match before if this card not already open
  if(firstClick == 0 && !cardsList[i].classList.contains('match') && !cardsList[i].classList.contains('open') ){
    var classString = cardsList[i].className; 
    var newClass = classString.concat(" open show"); 
    cardsList[i].className = newClass; 
    firstClick++;
    firstIndexSelected = i;
    isIgnore = false;
  }
  //if second card to open if this card is not match before if this card not already open
  else if(firstClick == 1 && !cardsList[i].classList.contains('match') && !cardsList[i].classList.contains('open') ){
    var classString = cardsList[i].className; 
    var newClass = classString.concat(" open show"); 
    cardsList[i].className = newClass;
    firstClick--;
    Moves++;
    document.getElementsByClassName('moves')[0].textContent =  Moves;
    if(cardsList[firstIndexSelected].children[0].classList[1] == cardsList[i].children[0].classList[1]){
        // match
        console.log('match');
        cardsList[i].className = "card match"; 
        cardsList[firstIndexSelected].className = "card match";
        TotalMatches++;
        if(TotalMatches==8){
            alert("you win");
        }
        isIgnore = false;
    }
    else{
        // doesnt match
        console.log('doesnt match');
        cardsList[i].className += " no-match";
        cardsList[firstIndexSelected].className += " no-match";
        setTimeout(function () {
            cardsList[i].className = "card";
            cardsList[firstIndexSelected].className = "card";
            isIgnore = false;
        }, 500);
        
        
    }
    
        
  }
  
}