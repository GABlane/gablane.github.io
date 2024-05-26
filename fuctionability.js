const bet = document.getElementById('Betting');
const cred = document.getElementById('Credits');
const box1 = document.getElementById('Box1');
const box2 = document.getElementById('Box2');
const box3 = document.getElementById('Box3');
const startButton = document.getElementById('start');
const message = document.getElementById('text1');
const message2 = document.getElementById('text2');
let isPause = true;
let timer = 0;
let intervalId;
let credits = 100; // Initialize credits with a value of 100
let betValue = 0; // Declare betValue in a scope accessible by both start and pause

const images = [
    'pictures/asher.jpg',
    'pictures/awyn.jpg',
    'pictures/colmo.jpg',
    'pictures/kyle.jpg',
    'pictures/lance.jpg',
    'pictures/renz.jpg',
    'pictures/leonardo.jpg'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function updateCreditsDisplay() {
    cred.textContent = credits;
}

function start() {
    if (!isPause) return;
    isPause = false;

    betValue = parseInt(bet.value, 10); // Retrieve and parse the betting input value
    if (isNaN(betValue) || betValue <= 0) {
        alert('Please enter a valid bet amount.');
        isPause = true;
        return;
    }
    if (betValue > credits) {
        alert('You do not have enough credits to place this bet.');
        isPause = true;
        return;
    }

    credits -= betValue; // Deduct the bet value from credits
    updateCreditsDisplay(); // Update the display of credits

    intervalId = setInterval(() => {
        if (!isPause) {
            const img1 = getRandomImage();
            const img2 = getRandomImage();
            const img3 = getRandomImage();

            box1.innerHTML = `<img src="${img1}" alt="Random Image">`;
            box2.innerHTML = `<img src="${img2}" alt="Random Image">`;
            box3.innerHTML = `<img src="${img3}" alt="Random Image">`;

            timer++;
            if (timer >= 10) {
                pause(img1, img2, img3);
            }
        }
    }, 100);
}

function pause(img1, img2, img3) {
    isPause = true;
    clearInterval(intervalId);
    timer = 0;
    
    if (img1 === img2 && img2 === img3) {
        message.textContent = "Congratulations! All images match!";
        message2.textContent = "Congratulations! All images match!";
        credits += betValue * 5; // Example winning logic, five times the bet
    } else if (img1 === img2 || img2 === img3 || img1 === img3) {
        message.textContent = "Congratulations! 2 images match!";
        credits += betValue * 2; // Example winning logic, double the bet
    } else {
        message.textContent = "TRY AGAIN";
        message2.textContent = "TRY AGAIN";
    }

    updateCreditsDisplay(); // Update the display of credits
}

startButton.addEventListener('click', start);

// Initialize the credits display when the page loads
updateCreditsDisplay();
