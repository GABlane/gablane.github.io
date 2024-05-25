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
            questionText.textContent = 'Q' + (index + 1) + ': ' + question.question;
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
    hideClock();
    hideAdd();
    hideQuestionContainer();
    startTimer();
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
    
}

function submitAnswers() {
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
    resultMessage.textContent = 'You answered ' + correctAnswers + ' out of ' + totalQuestions + ' questions correctly. With a remaining time of ' + timeLeft + ' seconds.' ;
    document.querySelector('.headContainer').appendChild(resultMessage);
    show();
    hideSubmit();
    disClock();
    showAdd();
    pauseTimer();
    var reviewArea = document.getElementById('reviewArea');
    reviewArea.innerHTML = '';
}

function showSubmit() {
    var submitButton = document.getElementById('submitAnswers');
    submitButton.style.display = 'block';
}

function hideSubmit() {
    var submitButton = document.getElementById('submitAnswers');
    submitButton.style.display = 'none';
}

function show() {
    var questionContainer = document.querySelector('.questionContainer');
    questionContainer.style.display = 'flex';
}

// Function to hide the question container
function hideQuestionContainer() {
    var questionContainer = document.querySelector('.questionContainer');
    questionContainer.style.display = 'none';
}

//counter
        let countdown;
        const timerDisplay = document.getElementById('timerDisplay');
        let isPaused = true;
        let timeInput = document.getElementById('clock');
        let timeLeft = parseInt(timeInput.value) || 300;
        function updateDisplay(time){
            const hours = Math.floor((time / 3600));
            const minutes = Math.floor((time % 3600 / 60));
            const seconds = time % 60;
            timerDisplay.textContent = `${String(hours).padStart(2, '0')}: ${String(minutes).padStart(2, '0')}: ${String(seconds).padStart(2, '0')}`;
        }
        function pauseTimer() {
            if(isPaused)
                return;
            clearInterval(countdown);
            isPaused = true;
        }

        function disClock() {
            var submitButton = document.getElementById('clock');
            submitButton.style.display = 'block';
        }
        function hideClock(){
            var submitButton = document.getElementById('clock');
            submitButton.style.display = 'none';
        }
        function showAdd(){
            var submitButton = document.getElementById('addQuestion');
            submitButton.style.display = 'block';
        }
        function hideAdd(){
            var submitButton = document.getElementById('addQuestion');
            submitButton.style.display = 'none';
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
timeInput.addEventListener('input', function() {
    timeLeft = parseInt(timeInput.value) || 300; 
    updateDisplay(timeLeft);
});

