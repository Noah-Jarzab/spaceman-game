// create a score and score function based on time remaining once the phrase is completed
// create a function to check the phrase and end the game upon completion
// allow the score to carry over into the next game
// create a function where the available letters gray out when selected and the picked letters illuminate upon selection
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

buildArray = [
	buildBase,
	buildDome,
	buildLeftLeg,
	buildCenterLeg,
	buildRightLeg,
	buildLeftCircle,
	buildCenterCircle,
	buildRightCircle,
	buildHead,
	buildBody,
];

let inputBox = document.querySelector('.submit');
let resetButton = document.querySelector('.reset');
let startButton = document.querySelector('.start');
let hideWordArray = [];
let hiddenPhrase;
startButton.style.visibility = 'hidden';
resetButton.style.visibility = 'hidden';

let phraseBox = document.querySelector('.guessPhrase');
inputBox.addEventListener('click', function () {
	let phrase = document.getElementById('phrase').value;
	hiddenPhrase = phrase.split('');
	document.querySelector('#phrase').hidden = 'true';
	document.querySelector('.submit').hidden = 'true';
	for (i = 0; i <= hiddenPhrase.length - 1; i++) {
		let hiddenLetterBox = document.createElement('li');
		hiddenLetterBox.setAttribute('class', 'hiddenBox');
		hiddenLetterBox.setAttribute('id', 'indLetter');
		phraseBox.appendChild(hiddenLetterBox);
		hiddenLetterBox.innerText = hiddenPhrase[i];
		// hiddenLetter.setAttribute('class', 'hiddenLetter');
		// hiddenLetterBox.appendChild(hiddenLetter);

		// if(hiddenPhrase[i] === ' ') {
		// 	hiddenLetterBox.innerHTML = '-';
		// } else {
		// 	hiddenLetterBox.innerHTML = '_';
		// }
	}
});

startButton.addEventListener('click', function () {
	startButton.style.visibility = 'hidden';
	resetButton.style.visibility = 'visible';
	// startTimer();
});

for (i = 0; i <= alphabet.length - 1; i++) {
	let availLetters = document.querySelector('#availLetters');
	let letterButton = document.createElement('button');
	letterButton.setAttribute('class', 'letterChoice');
	letterButton.innerText = alphabet[i];
	availLetters.appendChild(letterButton);
}

let correct;
let showPhrase = '';
// let showPhrase = document.setAttribute('class', 'foundLetter');
let wrongGuess = 0;
const letter = document.querySelector('#availLetters');
letter.addEventListener('click', function handleLetterButton(event) {
	event.preventDefault();
	if (hiddenPhrase.includes(event.target.innerHTML)) {
		for(i = 0; i <= hiddenPhrase.length -1; i++) {
			showPhrase = hiddenPhrase[i];
			if(showPhrase === event.target.innerHTML) {
				let showPhrase = document.createElement('li');
				phraseBox.appendChild(showPhrase);
				showPhrase.innerText = hiddenPhrase[i];
				showPhrase.setAttribute('class', 'foundLetter');
			}
		}
		console.log('Found match');
	
	} else {
		buildArray[wrongGuess]();
		wrongGuess += 1;
		if (wrongGuess === 10) {
			endGameLose();
		}
	}
});
let finale = document.querySelector('.endMessage');
let gameOver = document.createElement('div');
finale.appendChild(gameOver);

function endGameLose() {
	finale.innerText = 'You Lost!';
	resetButton.style.visibility = 'visible';
}

// document.addEventListener('click', function reset() {
// 	window.reset();
// });

// const timeLimit = 90;
// let timeElapsed = 0;
// let timeLeft = timeLimit;
// let interval = null;

// const timer = document.querySelector('#time');
// function formatTimer(time) {
// 	const minutes = Math.floor(time / 60);
// 	let seconds = time % 60;
// 	if (seconds < 10) {
// 		seconds = `0${seconds}`;
// 	}
// 	timer.innerText = `${minutes}:${seconds}`;
// }

// function timerUp() {
// 	clearInterval(interval);
// 	alert("Time's up!!");
// }

// function startTimer() {
// 	interval = setInterval(function () {
// 		timeElapsed = timeElapsed += 1;
// 		timeLeft = timeLimit - timeElapsed;
// 		document.getElementsByClassName('timer').innerHTML = formatTimer(timeLeft);
// 		if (timeLeft === 0) {
// 			timerUp();
// 		}
// 	}, 1000);
// }
