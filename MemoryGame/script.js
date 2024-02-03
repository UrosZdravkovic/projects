import { newGame } from "./modules/newGame.js";
import { stopTimer } from "./modules/flipMatchCard.js";
import { displayResults } from "./modules/localStorage.js";


const startBtn = document.querySelector('#startGameBtn');

startBtn.addEventListener('click', () => {

    newGame();
    stopTimer();

});

let radioBoxScore = document.querySelectorAll('.score input[type="radio"]');
radioBoxScore.forEach(radio => {
    radio.addEventListener('click', () => {
        if(radio.id === 'beginnerRadio'){
            displayResults('beginner');
        } else if(radio.id === 'normalRadio'){
            displayResults('normal');
        } else if (radio.id === 'hardRadio'){
            displayResults('hard');
        } else if (radio.id === 'expertRadio'){
            displayResults('expert');
        }
    });
});

// CLOSING MODAL

const closeModal = document.querySelector('#closeModal');
closeModal.addEventListener('click', () =>{
    document.querySelector('.winModal').style.display = "none";
    document.querySelector('.winModal p').innerHTML = '';
    let diffculty = document.querySelector('.difficultyWrapperBig input[type="radio"]:checked').id;
    displayResults(diffculty);    
});

const newGameModal = document.querySelector('#newGame');
newGameModal.addEventListener('click', () => {
    document.querySelector('.winModal').style.display = "none";
    document.querySelector('.winModal p').innerHTML = '';
    newGame();
    let diffculty = document.querySelector('.difficultyWrapperBig input[type="radio"]:checked').id;
    displayResults(diffculty);
});

const closeAlertModal = document.querySelector('#closeAlert');
closeAlertModal.addEventListener('click', () => {
    document.querySelector('.alertModal').style.display = 'none';
});



