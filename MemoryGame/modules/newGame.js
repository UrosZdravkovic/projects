import { shuffleArray, shuffleArrayCorrectNumber } from "./arrayShuffle.js";
import { rotateCard, createCard } from "./flipMatchCard.js";
import { displayResults } from "./localStorage.js";

const userNameInput = document.querySelector('#userName');
const beginnerRadio = document.querySelector('#beginner')
const normalRadio = document.querySelector('#normal')
const hardRadio = document.querySelector('#hard')
const expertRadio = document.querySelector('#expert')
const field  = document.querySelector('.fieldWrapper');


function newGame(){
    field.innerHTML = '';
    if(userNameInput.value != null && userNameInput.value != ''){
        if(beginnerRadio.checked){
            //field.classList.add('fieldWrapper')
            document.querySelector('#beginnerRadio').checked = true;
            displayResults('beginner');
            shuffleArrayCorrectNumber(shuffleArray, 8).forEach(el => {
                createCard(el);
                let cards = document.querySelectorAll('.card');
                cards.forEach(card => card.addEventListener('click', rotateCard));
                
            });
            
        }

        if(normalRadio.checked){
            //field.classList.add('fieldWrapperNormal')
            document.querySelector('#normalRadio').checked = true;
            displayResults('normal');
            shuffleArrayCorrectNumber(shuffleArray, 18).forEach(el => {
                createCard(el);
                let cards = document.querySelectorAll('.card');
                cards.forEach(card => card.addEventListener('click', rotateCard));
            });
        }

        if(hardRadio.checked){
            document.querySelector('#hardRadio').checked = true;
            displayResults('hard');
            //field.classList.add('fieldWrapperHard')
            shuffleArrayCorrectNumber(shuffleArray, 32).forEach(el => {
                createCard(el);
                let cards = document.querySelectorAll('.card');
                cards.forEach(card => card.addEventListener('click', rotateCard));
            });
        }

        if(expertRadio.checked){
            document.querySelector('#expertRadio').checked = true;
            displayResults('expert');
            //field.classList.add('fieldWrapperExpert')
            shuffleArrayCorrectNumber(shuffleArray, 50).forEach(el => {
                createCard(el);
                let cards = document.querySelectorAll('.card');
                cards.forEach(card => card.addEventListener('click', rotateCard));
            });
        }
    } else {
        document.querySelector('.alertModal').style.display = 'block';
    }

}




export {newGame};
export {field}