import { field } from "./newGame.js";
import { saveLocalStorageScore } from "./localStorage.js";

// KREIRANJE KARTICE
let createCard = (el) => {
    let card = document.createElement('div');
    let front = document.createElement('div');
    let imgFront = document.createElement('img')
    let back = document.createElement('div');

    front.classList.add('front');
    back.classList.add('back');
    imgFront.src = "img/christmas-tree.png";
    card.classList.add('card');
    back.innerHTML = `${el}`;
    card.dataset.content = `${el}`;
    front.appendChild(imgFront);
    card.appendChild(front)
    card.appendChild(back)
    field.appendChild(card);
    cardMatched = 0;
}

// FLIP KARTICE
let hasFlippedCard = false;
let firstCard, secondCard;
let lockField = false;
let cardMatched = 0;


function rotateCard(){
    if(lockField) return
    if(this === firstCard) return;
    this.classList.add('flipCard');
    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        
    } else {
        secondCard = this;
        lockField = true;
        matchCards()
        if(cardMatched === document.querySelectorAll('.card').length / 2){
            let winModal = document.querySelector('.winModal');
            winModal.style.display = 'block'
            let p = document.querySelector('#timerP');
            p.innerHTML = `Your time is: ${document.querySelector('#timer').innerHTML}`;
            winModal.prepend(p);
            saveLocalStorageScore();
            stopTimer();
            console.log('radi');
            cardMatched = 0;

        }   
    }
}



// PROVERAVANJE DA LI SU OKRENUTE KARTICE JEDNA PREKO DATASET
function matchCards() {
    // AKO SE DATASET POKLAPA SKIDAMO FLIP CARD LISTENER DA NE BI MOGLI DA OKRENEMO KARTICE NAZAD
    if(firstCard.dataset.content === secondCard.dataset.content){
        firstCard.removeEventListener('click', rotateCard);
        secondCard.removeEventListener('click', rotateCard);
        resetField();
        cardMatched++;

    } else {
        // POSTAVLJAMO TIMEOUT DA BI MOGLI VIDETI DRUGU KARTICU, JER INACE SE KLASA ODMA SKINE I KARTICA SE NE OKRENE
        setTimeout(() => {
            firstCard.classList.remove('flipCard');
            secondCard.classList.remove('flipCard');
            resetField();

        },500)   
    }    
}

let s = 0;
let m = 0;
let timerInterval;

function startTimer() {
    if (s == 0) {
        timerInterval = setInterval(() => {
            s++;
            if (s > 59) {
                m++;
                s = 0;
            }

            let formattedS = (s < 10) ? "0" + s : "" + s;
            let formattedM = (m < 10) ? "0" + m : "" + m;

            document.querySelector('#timer').innerHTML = `${formattedM}:${formattedS}`;
        }, 1000);
    }
}
    

function stopTimer() {
    clearInterval(timerInterval);
    s = 0;
    m = 0;  
    document.querySelector('#timer').innerHTML = '00:00';
}

// KORISTIMO VREDNOSTI DA BI BLOKIRALI BAGOVE KLIKTANJA I PREVREMENA

function resetField(){
    hasFlippedCard = false;
    lockField = false;
    firstCard = null;
    secondCard = null;
}

export {createCard, rotateCard, stopTimer, startTimer}