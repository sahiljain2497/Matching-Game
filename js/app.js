var arr = ['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb', 'fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb']
var previous;
var previouscard;
var current;
var currentcard;
var count = 0;
var moves = 0;
var star1 = 1;
var star2 = 1;
var over = 0;
var stars = document.getElementsByClassName('fa-star');
var cards = document.getElementsByClassName('card');
var reset = document.getElementsByClassName('restart');
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("close")[0];
var result = document.getElementsByClassName('resultmoves')[0];
reset[0].addEventListener("click", newgame);
var startbtn = document.getElementsByClassName('start')[0];
var time = {
    mins: 0,
    secs: 0
}
var min = document.getElementById('min');
var sec = document.getElementById('sec');
var glass = document.getElementsByClassName('glass')[0];
var isStarted = false;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function opencard() {
    if (count == 1) {
        moves = moves + 1;
        if (moves > 15 && star1 == 1) {
            stars[0].parentNode.removeChild(stars[0]);
            star1 = 0;
        }
        if (moves > 25 && star2 == 1) {
            stars[1].parentNode.removeChild(stars[1]);
            star2 = 0;
        }
        document.getElementsByClassName('moves')[0].innerHTML = moves;
        for (var i = 0; i < cards.length; i++) {
            cards[i].removeEventListener("click", opencard);
        }
        this.style.transition = "all 1s";
        this.classList.add("open");
        this.classList.add("show");
        current = this.childNodes[1].className;
        currentcard = this;
        count = 0;
        if (current == previous) {
            previouscard.classList.add("match");
            currentcard.classList.add("match");
            previouscard = null;
            previous = null;
            currentcard = null;
            current = null;
            for (var i = 0; i < cards.length; i++) {
                cards[i].addEventListener("click", opencard);
            }
        } else {
            setTimeout(function() {
                previouscard.style.background = "#FF2D00";
                currentcard.style.background = "#FF2D00";
                setTimeout(function() {
                    previouscard.classList.remove("open");
                    previouscard.classList.remove("show");
                    previouscard.style.background = null;
                    currentcard.classList.remove("open");
                    currentcard.classList.remove("show");
                    currentcard.style.background = null;
                    previouscard = null;
                    previous = null;
                    currentcard = null;
                    current = null;
                    for (var i = 0; i < cards.length; i++) {
                        cards[i].addEventListener("click", opencard);
                    }
                }, 500);
            }, 500);
        }
        console.log(moves);
        for (var i = 0; i < cards.length; i++) {
            if (cards[i].classList.contains('match'))
                over = 0;
            else {
                over = 1;
                break;
            }
        }
        if (over == 0) {
            modal.style.display = "block";
            result.innerHTML = "You Made " + moves + " to finish the game";
            console.log('done');
            reset[0].click();
        }
        return;
    }
    if (count == 0) {
        moves = moves + 1;
        if (moves > 16 && star1 == 1) {
            stars[0].parentNode.removeChild(stars[0]);
            star1 = 0;
        }
        if (moves > 25 && star2 == 1) {
            star2 = 0;
            stars[1].parentNode.removeChild(stars[1]);
        }
        document.getElementsByClassName('moves')[0].innerHTML = moves;
        this.style.transition = "all 1s";
        this.classList.add("open");
        this.classList.add("show");
        this.removeEventListener("click", opencard);
        previous = this.childNodes[1].className;
        previouscard = this;
        count = count + 1;
    }
}

function newgame() {

    var newarr = shuffle(arr);
    console.log(newarr);
    for (var i = 0; i < cards.length; i++) {
        var e = document.createElement('i');
        e.classList.add('fa');
        e.classList.add(newarr[i]);
        cards[i].replaceChild(e, cards[i].childNodes[1]);
        cards[i].addEventListener('click', opencard);
        cards[i].classList.remove("show");
        cards[i].classList.remove("open");
        cards[i].classList.remove("match");
    }
    document.getElementsByClassName('moves')[0].innerHTML = 0;
    var ee = document.createElement('i');
    ee.classList.add('fa');
    ee.classList.add('fa-star');
    var list1 = document.createElement('li');
    list1.appendChild(ee);
    var list2 = list1.cloneNode(true);
    var list3 = list1.cloneNode(true);
    var stars = document.getElementsByClassName('stars');
    while (stars[0].hasChildNodes()) {
        stars[0].removeChild(stars[0].lastChild);
    }
    stars[0].appendChild(list1);
    stars[0].appendChild(list2);
    stars[0].appendChild(list3);
    if (!(isStarted)) {
        isStarted = true;
        var timer = setInterval(function() {
            if (time.secs > 59) {
                time.mins++;
                time.secs = 00;
                min.innerHTML = time.mins;
                sec.innerHTML = time.secs;
            }
            time.secs++;
            if (time.secs < 10) {
                time.secs = '0' + time.secs;
            }
            sec.innerHTML = time.secs;
        }, 1000);

        reset[0].addEventListener('click', function() {
            clearInterval(timer);
            reset[0].style.display = 'none';
            startbtn.style.display = 'block';
            glass.classList.remove('timer-glass');
            isStarted = false;
            time.mins = 0;
            time.secs = '00';
            min.innerHTML = time.mins;
            sec.innerHTML = time.secs;
        })
    }
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

startbtn.addEventListener('click', function() {
    startbtn.style.display = 'none';
    reset[0].style.display = 'block';
    glass.classList.add('timer-glass');
    newgame();
});

document.addEventListener('keydown', (event) => {
    const keyName = event.key;

    if (keyName === 'Control') {
        // do not alert when only Control key is pressed.
        return;
    }

    if (event.ctrlKey) {
        // Even though event.key is not 'Control' (i.e. 'a' is pressed),
        // event.ctrlKey may be true if Ctrl key is pressed at the time.
        if (startbtn.style.display == 'none') {
            if (keyName === 'r') {
                alert(`Combination of ctrlKey + ${keyName}`);
            }
        }
    } else {
        if (startbtn.style.display == 'none') {
            if (keyName === 'r') {
                reset[0].click();
            }
        }
    }
}, false);
