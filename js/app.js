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

var TimerFlag = true;


// initialization function to shuffle cards and start initiate html with shuffled cards 

function init() {
    show();
    cardsList = shuffle(cardsList);
    for(let i = 0 ;  i < cardsList.length ; i++ ){
        document.getElementsByClassName("deck")[0].appendChild(cardsList[i]);
        cardsList[i].addEventListener("click", function(){
            cardClicked(i);
        });
    }
}

// reset function to reload page

function resetGame() {
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
  
    if(TimerFlag){
        start();
        TimerFlag = false;
    }

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
        firstClick--;
        cardsList[i].className = "opencard open show"; 
        Moves++;
        document.getElementsByClassName('moves')[0].textContent =  Moves;
        document.getElementsByClassName('totalmoves')[0].textContent =  Moves;
        
        //star rating 
        if(Moves == 2){
            document.getElementsByClassName('stars')[0].children[2].children[0].className="fa fa-star-o";
            document.getElementsByClassName('totalstars')[0].textContent =  2;
        }
        else if( Moves == 8){
            document.getElementsByClassName('stars')[0].children[1].children[0].className="fa fa-star-o";
            document.getElementsByClassName('totalstars')[0].textContent =  1;
        }
        if(cardsList[firstIndexSelected].children[0].classList[1] == cardsList[i].children[0].classList[1]){
            // match
            console.log('match');
            cardsList[i].className = "opencard match"; 
            cardsList[firstIndexSelected].className = "opencard match";
            TotalMatches++;
            isIgnore = false;
            
            setTimeout(function () {
                if(TotalMatches==8){
                    stop();
                    console.log(formatTime(x.time()));
                    document.getElementsByClassName('totalSeconds')[0].innerHTML = formatTime(x.time());
                    document.getElementsByClassName('container')[1].className = "container hide";
                    document.getElementsByClassName('container')[0].className = "container youwon";
                    
                }
            }, 500);//this timeout just to wait until animation of match finish and then show the finish div
        }else{
            // doesnt match
            console.log('doesnt match');
            cardsList[i].className += " no-match";
            cardsList[firstIndexSelected].className += " no-match";
            setTimeout(function () {
                cardsList[i].className = "card";
                cardsList[firstIndexSelected].className = "card";
                isIgnore = false;
            }, 500);//this timeout just to wait until animation of no-match finish and then reverse card class to be clicked again
        }
    }else{
        isIgnore = false;
    }
}

//  Timer methods 
//	Simple example of using private variables
//
//	To start the stopwatch:
//		obj.start();
//
//	To get the duration in milliseconds without pausing / resuming:
//		var	x = obj.time();
//
//	To pause the stopwatch:
//		var	x = obj.stop();	// Result is duration in milliseconds
//
//	To resume a paused stopwatch
//		var	x = obj.start();	// Result is duration in milliseconds
//
//	To reset a paused stopwatch
//		obj.stop();
//
var	clsStopwatch = function() {
    // Private vars
    var	startAt	= 0;	// Time of last start / resume. (0 if not running)
    var	lapTime	= 0;	// Time on the clock when last stopped in milliseconds

    var	now	= function() {
        return (new Date()).getTime(); 
    }; 

    // Public methods
    // Start or resume
    this.start = function() {
        startAt	= startAt ? startAt : now();
    };

    // Stop or pause
    this.stop = function() {
        // If running, update elapsed time otherwise keep it
        lapTime	= startAt ? lapTime + now() - startAt : lapTime;
        startAt	= 0; // Paused
    };

    // Reset
    this.reset = function() {
        lapTime = startAt = 0;
    };

    // Duration
    this.time = function() {
        return lapTime + (startAt ? now() - startAt : 0); 
    };
};

var x = new clsStopwatch();
var time;
var clocktimer;

function pad(num, size) {
var s = "0000" + num;
return s.substr(s.length - size);
}

function formatTime(time) {
    var h = m = s = ms = 0;
    var newTime = '';

    h = Math.floor( time / (60 * 60 * 1000) );
    time = time % (60 * 60 * 1000);
    m = Math.floor( time / (60 * 1000) );
    time = time % (60 * 1000);
    s = Math.floor( time / 1000 );
    ms = time % 1000;

    newTime = pad(h, 2) + ':' + pad(m, 2) + ':' + pad(s, 2);
    return newTime;
}

function show() {
    time = document.getElementById('time');
    update();
}

function update() {
    time.innerHTML = formatTime(x.time());
}

function start() {
    clocktimer = setInterval("update()", 1);
    x.start();
}

function stop() {
    x.stop();
    clearInterval(clocktimer);
}

function reset() {
    stop();
    x.reset();
    update();
}