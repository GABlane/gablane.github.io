// Function to add a question to local storage
function addQuestion() {
    var questionInput = document.getElementById('questionInput').value;
    var answerInput = document.getElementById('answerInput').value;
    var optionInputs = document.querySelectorAll('#optionInput');

    // Convert optionInputs NodeList to an array of option values
    var options = Array.from(optionInputs).map(input => input.value.trim()).filter(option => option !== '');

    if (questionInput && answerInput && options.length > 0) {
        var questions = JSON.parse(localStorage.getItem('questions')) || [];
        questions.push({
            question: questionInput,
            answer: answerInput,
            options: options
        });
        localStorage.setItem('questions', JSON.stringify(questions));
        alert('Question added successfully!');
        document.getElementById('questionInput').value = '';
        document.getElementById('answerInput').value = '';
        optionInputs.forEach(input => input.value = '');
    } else {
        alert('Please enter question, answer, and at least one option.');
    }
}

// Function to review questions
function reviewQuestions() {
    var reviewArea = document.getElementById('reviewArea');
    reviewArea.innerHTML = '';

    var questions = JSON.parse(localStorage.getItem('questions')) || [];
    if (questions.length === 0) {
        reviewArea.textContent = 'No questions added yet.';
    } else {
        questions.forEach(function(question, index) {
            var questionDiv = document.createElement('div');
            var questionText = document.createElement('p');
            questionText.textContent = '#' + (index + 1) + ': ' + question.question;
            questionDiv.appendChild(questionText);

            question.options.forEach(function(option, optIndex) {
                var optionDiv = document.createElement('div');
                var optionInput = document.createElement('input');
                var optionLabel = document.createElement('label');

                optionInput.type = 'radio';
                optionInput.name = 'question' + index;
                optionInput.value = option;
                optionLabel.textContent = option;

                optionDiv.appendChild(optionInput);
                optionDiv.appendChild(optionLabel);
                questionDiv.appendChild(optionDiv);
            });

            reviewArea.appendChild(questionDiv);
        });
    }
    // Hide the question container when reviewing questions
    showSubmit();
    startTimer();

    // Change the LowerContainer grid column span
    var lowerContainer = document.querySelector('.LowerContainer');
    lowerContainer.style.gridColumn = '1 / 5';
}

function submitAnswers() {
    var add = document.getElementById('addQuestion');
    add.style.display = 'none';
    var questions = JSON.parse(localStorage.getItem('questions')) || [];
    var totalQuestions = questions.length;
    var correctAnswers = 0;

    questions.forEach(function(question, index) {
        var selectedOption = document.querySelector('input[name="question' + index + '"]:checked');
        if (selectedOption) {
            if (selectedOption.value === question.answer) {
                correctAnswers++;
            }
        }
    });

    var resultMessage = document.getElementById('Score');
    resultMessage.textContent = '';
    resultMessage.textContent = 'You answered ' + correctAnswers + ' out of ' + totalQuestions + ' questions correctly. With a remaining time of ' + timeLeft + ' seconds.';
    document.querySelector('.headContainer').appendChild(resultMessage);
    show();
    var lowerContainer = document.querySelector('.LowerContainer');
    lowerContainer.style.gridColumn = '3 / 5';
    pauseTimer();
    var reviewArea = document.getElementById('reviewArea');
    reviewArea.innerHTML = '';
}

function showSubmit() {
    LowerContainer = document.querySelector('.LowerContainer');
    LowerContainer.style.gridcollumn = '1/5';
    var reviewQuestions = document.getElementById('reviewQuestions');
    reviewQuestions.style.display = 'none';
    var questionContainer = document.querySelector('.questionContainer');
    questionContainer.style.display = 'none';
    var clear = document.getElementById('clearStorage');
    var clock = document.getElementById('clock');
    clock.style.display = 'none';
    clear.style.display = 'none';
    var submitButton = document.getElementById('submitAnswers');
    submitButton.style.display = 'block';
}

function show() {
    var reviewQuestions = document.getElementById('reviewQuestions');
    reviewQuestions.style.display = 'block';
    var clear = document.getElementById('clearStorage');
    var clock = document.getElementById('clock');
    clock.style.display = 'block';
    clear.style.display = 'block';
    var add = document.getElementById('addQuestion');
    add.style.display = 'block';
    var submitButton = document.getElementById('submitAnswers');
    submitButton.style.display = 'none';
    var questionContainer = document.querySelector('.questionContainer');
    questionContainer.style.display = 'flex';
}

// Timer functions
let countdown;
const timerDisplay = document.getElementById('timerDisplay');
let isPaused = true;
let timeInput = document.getElementById('clock');
let timeLeft = parseInt(timeInput.value) || 300;

function updateDisplay(time) {
    const hours = Math.floor((time / 3600));
    const minutes = Math.floor((time % 3600 / 60));
    const seconds = time % 60;
    timerDisplay.textContent = `${String(hours).padStart(2, '0')}: ${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`;
}

function pauseTimer() {
    if (isPaused)
        return;
    clearInterval(countdown);
    isPaused = true;
}

function startTimer() {
    if (!isPaused)
        return;
    isPaused = false;
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay(timeLeft);
        } else {
            clearInterval(countdown);
            submitAnswers(); // Call submitAnswers function when time is up
            alert("Time's up!"); // Optionally, alert the user when time is up
        }
    }, 1000);
}

function clearLocalStorage() {
    localStorage.clear();
    alert('localStorage has been cleared.');
}

// Event listeners
document.getElementById('submitAnswers').addEventListener('click', submitAnswers);
document.getElementById('addQuestion').addEventListener('click', addQuestion);
document.getElementById('reviewQuestions').addEventListener('click', reviewQuestions);
document.getElementById('clearStorage').addEventListener('click', clearLocalStorage);
timeInput.addEventListener('input', function () {
    timeLeft = parseInt(timeInput.value) || 300;
    updateDisplay(timeLeft);
});
