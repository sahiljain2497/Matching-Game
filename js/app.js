/*
 * Create a list that holds all of your cards
 */
var arr =  ['fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb','fa-diamond','fa-paper-plane-o','fa-anchor','fa-bolt','fa-cube','fa-leaf','fa-bicycle','fa-bomb']

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

var newarr=shuffle(arr);
//console.log(newarr);
var cards=document.getElementsByClassName('card');
//console.log(cards[0].childNodes[1]);
for(var i =0;i<cards.length;i++){
    var e=document.createElement('i');
    e.classList.add('fa');
    e.classList.add(newarr[i]);
    cards[i].replaceChild(e,cards[i].childNodes[1]);
    cards[i].classList.remove('open');
    cards[i].classList.remove('show');
    cards[i].classList.remove('match');
    cards[i].addEventListener('click',opencard);
}
//console.log(cards[0].childNodes[1]);
function opencard(){
    //console.log('adad');
    this.style.transition="all 1s";
    this.classList.add("open");
    this.classList.add("show");
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
