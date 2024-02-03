import { field } from "./newGame.js";

let memoryCards = 
["😀", "😺", "🌈", "🚀", "🌟", "🌺", "🍕", "🎈", "🎉", 
"🎸", "🍦", "🏖️", "📚", "🎨", "🎭", "🍔", "🍩", "🌍", 
"🚲", "🚀", "🚁", "🎮", "🎲", "🎤", "🎧", "🎼", "🎷", 
"🎺", "🌅", "🏞️", "🏰", "🏝️", "🍹", "🍭", "🍓", "🌮",
"🍍", "🍇", "🍌", "🌽", "🥑", "🍉", "🍇", "🍊", "🍋", "🍎", "🍏", "🍒", "🍑", "🍀"];


function shuffleArray(niz){

    for (let i = niz.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1));
        let temp = niz[i];
        niz[i] = niz[j];
        niz[j] = temp;
    }
    return niz;
}


let shuffleArrayCorrectNumber = (array,elementNumber) => {
    let memoryCardNumberRequested = [];
    if(elementNumber == 8){
        field.classList.remove('fieldWrapperExpert');
        field.classList.remove('fieldWrapperNormal');
        field.classList.remove('fieldWrapperHard');
        field.classList.add('fieldWrapper');
        shuffleArray(array);
        memoryCardNumberRequested = memoryCards.slice(0, 8);
        memoryCardNumberRequested = memoryCardNumberRequested.concat(memoryCardNumberRequested);
        shuffleArray(memoryCardNumberRequested)
        return memoryCardNumberRequested
    }

    if(elementNumber == 18){
        field.classList.remove('fieldWrapper');
        field.classList.remove('fieldWrapperExpert');
        field.classList.remove('fieldWrapperHard');
        field.classList.add('fieldWrapperNormal');
        shuffleArray(array);
        memoryCardNumberRequested = memoryCards.slice(0, 18);
        memoryCardNumberRequested = memoryCardNumberRequested.concat(memoryCardNumberRequested);
        shuffleArray(memoryCardNumberRequested)
        return memoryCardNumberRequested
    }

    if(elementNumber == 32){
        field.classList.remove('fieldWrapperExpert');
        field.classList.remove('fieldWrapper');
        field.classList.remove('fieldWrapperNormal');
        field.classList.add('fieldWrapperHard');
        shuffleArray(array);
        memoryCardNumberRequested = memoryCards.slice(0, 32);
        memoryCardNumberRequested = memoryCardNumberRequested.concat(memoryCardNumberRequested);
        shuffleArray(memoryCardNumberRequested)
        return memoryCardNumberRequested
    }
    
    if(elementNumber == 50){
        field.classList.remove('fieldWrapper');
        field.classList.remove('fieldWrapperNormal');
        field.classList.remove('fieldWrapperHard');
        field.classList.add('fieldWrapperExpert');
        shuffleArray(array);
        memoryCardNumberRequested = memoryCards.slice(0, 50);
        memoryCardNumberRequested = memoryCardNumberRequested.concat(memoryCardNumberRequested);
        shuffleArray(memoryCardNumberRequested)
        return memoryCardNumberRequested
    }

}



export {shuffleArrayCorrectNumber, shuffleArray}