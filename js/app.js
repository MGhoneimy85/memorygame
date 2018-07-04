/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




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
var cardsList = [].slice.call(document.getElementsByClassName("card"));
var firstClick = 0;
var firstIndexSelected = 0;
var Moves = 0;
document.getElementsByClassName('moves')[0].textContent =  Moves;
var TotalMatches = 0;
var isIgnore = false;


// initialization function to shuffle cards and start initiate html with shuffled cards 

function init() {
    cardsList = shuffle(cardsList);
    for(let i = 0 ;  i < cardsList.length ; i++ ){
        document.getElementsByClassName("deck")[0].appendChild(cardsList[i]);
        cardsList[i].addEventListener("click", function(){
            cardClicked(i);
        });
    }
}

// reset function to reload page

function reset() {
    location.reload();
}

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

// on any card clicked function to check if this the first or second and if second to check if match or no match

function cardClicked(i) {
 
  if(isIgnore || cardsList[i].className == "opencard open show" )
    return; // return if user click third card and event for second card not finished yet 

  isIgnore = true;

  //if first card to open 
  if(firstClick == 0 && cardsList[i].className == "card" ){
    isIgnore = false;
    firstClick++;
    cardsList[i].className = "opencard open show"; 
    firstIndexSelected = i;
  }
  //if second card to open
  else if(firstClick == 1 && cardsList[i].className == "card" ){
    event.preventDefault();
    firstClick--;
    cardsList[i].className = "opencard open show"; 
    Moves++;
    document.getElementsByClassName('moves')[0].textContent =  Moves;
    document.getElementsByClassName('totalmoves')[0].textContent =  Moves;

    if(cardsList[firstIndexSelected].children[0].classList[1] == cardsList[i].children[0].classList[1]){
        // match
        console.log('match');
        cardsList[i].className = "opencard match"; 
        cardsList[firstIndexSelected].className = "opencard match";
        TotalMatches++;
        isIgnore = false;
        if(Moves <= 10 && TotalMatches == 4){
            document.getElementsByClassName('stars')[0].children[1].children[0].className="fa fa-star";
            document.getElementsByClassName('totalstars')[0].textContent =  2;
        }
        else if( Moves <=20 && TotalMatches == 8){
            document.getElementsByClassName('stars')[0].children[1].children[0].className="fa fa-star";
            document.getElementsByClassName('stars')[0].children[2].children[0].className="fa fa-star";
            document.getElementsByClassName('totalstars')[0].textContent =  3;
        }
        else{
            document.getElementsByClassName('totalstars')[0].textContent =  1;
        }
        setTimeout(function () {
            if(TotalMatches==8){
                document.getElementsByClassName('container')[0].className = "container youwon";
                document.getElementsByClassName('container')[1].className = "container hide";
            }
        }, 500);
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