// Receive input from the .phrase box with the submit button to create blank spaces under the image that starts out empty
// create a timer in the corner that starts when the start button is clicked
// create a start button after the phrase is received to start the timer
// create a score and score function based on time remaining once the phrase is completed
// create a function to check the phrase and end the game upon completion
// allow the score to carry over into the next game
// create a function where the available letters gray out when selected and the picked letters illuminate upon selection
// when a selection is not in the phrase or word have a function populate part of the image
// create an event for when the image is completed or phrase is completed for a loss or win situation respectively
// create a reset button and function that appears after the game is over
// reset button should revert back to word input phase while maintaining the player score
// create a messages box that responds to user selections. e.g. "You have already selected ${letter}", "${letter} is not in the phrase", "There's ${numberOfLetters} ${letter} in the phrase! Good Job!", "You're getting close to takeoff... be careful!", etc

let alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'x',
	'y',
	'z',
];

const canvas = document.querySelector('#spaceshipImage');
const ctx = canvas.getContext('2d');
function buildBase() {
	ctx.fillStyle = 'silver';
	ctx.beginPath();
	ctx.ellipse(250, 175, 95, 25, 0, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}

function buildDome() {
	ctx.fillStyle = 'white';
	ctx.beginPath();
	ctx.ellipse(250, 168, 45, 35, 0, 0, Math.PI, true);
	ctx.stroke();
	ctx.fill();
}

function buildLeftLeg() {
	ctx.moveTo(175, 190);
	ctx.lineTo(170, 210);
	ctx.stroke();
}

function buildCenterLeg() {
	ctx.moveTo(250, 200);
	ctx.lineTo(250, 220);
	ctx.stroke();
}

function buildRightLeg() {
	ctx.moveTo(325, 190);
	ctx.lineTo(330, 210);
	ctx.stroke();
}

function buildLeftCircle() {
	ctx.fillStyle = 'orange';
	ctx.beginPath();
	ctx.arc(190, 177, 5, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}

function buildCenterCircle() {
	ctx.fillStyle = 'yellow';
	ctx.beginPath();
	ctx.arc(250, 185, 6, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}

function buildRightCircle() {
	ctx.fillStyle = 'red';
	ctx.beginPath();
	ctx.arc(315, 177, 5, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.fill();
}

function buildHead() {
	ctx.beginPath();
	ctx.arc(250, 155, 4, 0, 2 * Math.PI);
	ctx.stroke();
}

function buildBody() {
	ctx.moveTo(250, 159);
	ctx.lineTo(250, 170);
	ctx.moveTo(250, 165);
	ctx.lineTo(242, 160);
	ctx.moveTo(250, 165);
	ctx.lineTo(256, 168);
	ctx.stroke();
}
// buildBase();
// buildDome();
// buildLeftLeg();
// buildRightLeg();
// buildCenterLeg();
// buildCenterCircle();
// buildLeftCircle();
// buildHead();
// buildBody();
// buildRightCircle();

let inputBox = document.querySelector('.submit');
let resetButton = document.querySelector('.reset');
let startButton = document.querySelector('.start');
// startButton.hidden = 'true';
// resetButton.hidden = 'true';
resetButton.style.visibility = 'hidden';

inputBox.addEventListener('click', function () {
	let phrase = document.getElementById('phrase').value;
	let hiddenPhrase = phrase.split('');
	let phraseBox = document.querySelector('.guessPhrase');
	document.querySelector('#phrase').hidden = 'true';
    document.querySelector('.submit').hidden = 'true';
    startButton.style.visibility = 'visible';
	// then create  underlined hidden text for each array item
	for (i = 0; i <= hiddenPhrase.length - 1; i++) {
		let hiddenLetter = document.createElement('div');
		hiddenLetter.innerText = hiddenPhrase[i].toUpperCase();
		phraseBox.appendChild(hiddenLetter);
		hiddenLetter.setAttribute('class', 'hiddenLetter');
	}
});

const letters = document.querySelector('#availLetters');
const hiddenLetter = document.getElementsByClassName('hiddenLetter');
letters.addEventListener('click', handleLetterSelect);
function handleLetterSelect(event) {
	event.preventDefault();
	if (event.target.innerText == hiddenLetter.innerText) {
		console.log('Picked a correct letter');
	} else {
		console.log('Not a match');
	}
}

// add functions for when the letter buttons are clicked to make them disabled and compare to the hidden phrase and populate that or build 1/10 parts of the spaceship

startButton.addEventListener('click', function () {
    for (i = 0; i <= alphabet.length - 1; i++) {
        let availLetters = document.querySelector('#availLetters');
        let letterButton = document.createElement('button');
        letterButton.setAttribute('class', 'letter');
        letterButton.innerText = alphabet[i].toUpperCase();
        availLetters.appendChild(letterButton);
    }
	startTimer();
});

// document.addEventListener('click', resetButton);
// function reset() {

// }

const timeLimit = 90;
let timeElapsed = 0;
let timeLeft = timeLimit;
let interval = null;

const timer = document.querySelector('.timer');
function formatTimer(time) {
	const minutes = Math.floor(time / 60);
	let seconds = time % 60;
	if (seconds < 10) {
		seconds = `0${seconds}`;
	}
	timer.innerText = `${minutes}:${seconds}`;
}

function timerUp() {
	clearInterval(interval);
	alert("Time's up!!");
}

function startTimer() {
	interval = setInterval(function () {
		timeElapsed = timeElapsed += 1;
		timeLeft = timeLimit - timeElapsed;
		document.getElementsByClassName('timer').innerHTML = formatTimer(timeLeft);
		if (timeLeft === 0) {
			timerUp();
		}
	}, 1000);
}
