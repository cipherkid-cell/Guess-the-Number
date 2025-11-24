let randomNum = parseInt((Math.random() * 100) + 1);
console.log(randomNum);
const submit = document.querySelector('#subt');
const input = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if(playGame){
    submit.addEventListener('click', function(e){
     e.preventDefault();
     const guess = parseInt(input.value);
     console.log(guess);
     validateGuess(guess);
    } )
}

function validateGuess(guess){
    if(isNaN(guess)){
        window.alert(`Please enter a valid number`);
    }
    else if(guess < 1){
        window.alert(`Please enter a number between 1 to 100`);
    }
    else if(guess > 100){
        window.alert(`Please enter a number between 1 to 100`);
    }
    else{
        prevGuess.push(guess);
        // End the game after 10 attempts regardless of what the 10th guess is
        displayGuess(guess);
        if(numGuess > 10){
            displayMessage(`The game is over. Random number was ${randomNum}`);
            endGame();
        } else {
            checkGuess(guess);
        }


    }
}
function checkGuess(guess){
    if(guess === randomNum){
        displayMessage(`You guessed it right`);
        endGame();
    }
    else if(guess < randomNum){
        displayMessage(`The number is too low`);
    }
    else if(guess > randomNum){
        displayMessage(`The number is too high`);
    }
}

function displayGuess(guess){
    input.value = '';
    guessSlot.innerHTML += `${guess}   `;
    numGuess++;
    // Fix: Prevent remaining guesses from going negative by setting a minimum of 0
    let remainingGuesses = 11 - numGuess;
    if (remainingGuesses < 0) remainingGuesses = 0;
    remaining.innerHTML = `${remainingGuesses}`;
}
function displayMessage(message){
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame(){
    input.value = '';
    input.setAttribute('disabled', '');
    
    // Remove existing button if it exists
    const existingButton = document.querySelector('#newGame');
    if (existingButton && existingButton.parentNode) {
        existingButton.parentNode.remove();
    }
    // The bug is this line:
    //     if (existingButton && existingButton.parentNode) {
    //         existingButton.parentNode.remove();
    //     }
    // This removes the entire <p> element, which prevents the new button being created in the DOM,
    // so your new game button never shows up.
    // To fix: Instead of removing the parent node, you should remove the parent element (the <p> containing the button) itself,
    // but only if it exists, and *before* creating a new <p>.
    // However, since your "Start new Game" button is actually an <h2> inside a <p class="button">, 
    // use querySelector to find the <p> container and remove that.
    // So replace/remove the above few lines with just:
    const existingButtonParent = document.querySelector('p.button');
    if (existingButtonParent && existingButtonParent.parentNode) {
        existingButtonParent.parentNode.removeChild(existingButtonParent);
    }
    // Create new button element
    const p = document.createElement('p');
    p.classList.add(`button`);
    p.innerHTML = `<h2 id = "newGame">Start new Game</h2>`;
    startOver.append(p);
    
    playGame = false;
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame');
    if (newGameButton) {
        newGameButton.addEventListener('click', function (){
            randomNum = parseInt((Math.random() * 100) + 1);
            console.log(randomNum);
            prevGuess = [];
            numGuess = 1;
            remaining.innerHTML = `${11 - numGuess}`;
            guessSlot.innerHTML = '';
            lowOrHi.innerHTML = '';
            input.removeAttribute('disabled');
            
            // Remove the button (remove the p element that contains the h2)
            const buttonToRemove = document.querySelector('#newGame');
            if (buttonToRemove && buttonToRemove.parentNode) {
                buttonToRemove.parentNode.remove();
            }
            
            playGame = true;    
        });
    }
}
