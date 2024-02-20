
var startGameEl = document.querySelector("#start-game");
var questions = document.querySelector("#questions");
var intro = document.querySelector("#intro");
var questionEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");
var resultEl = document.querySelector("#result");
var timerEl = document.querySelector("#timer");
var viewHighscoresEl = document.querySelector("#view-highscores");
var submitScoreEl = document.querySelector("#submit-score");
var finalScoreEl = document.querySelector("#final-score");
var initialsInputEl = document.querySelector("#initials");
var scoreFormEl = document.querySelector("#score-form");
var highscoresEl = document.querySelector("#highscores");
var highscoreListEl = document.querySelector("#highscore-list");
var goBackEl = document.querySelector("#go-back");
var clearHighscoresEl = document.querySelector("#clear-highscores");



var timer = 20;
var timerInterval;

var question = [
  {
    question: "What is JavaScript?",
    choices: ["A programming language", "A database management system", "A markup language", "An operating system"],
    answer: "A programming language",
  },
  {
    question: "How do you declare a variable in JavaScript?",
    choices: ["var", "variable", "v", "let"],
    answer: "var",
  },
  {
    question: "What does the '===' operator in JavaScript do?",
    choices: ["Assigns a value to a variable", "Compares values for equality without type coercion", "Performs bitwise XOR operation", " Checks if a variable is defined"],
    answer: "Compares values for equality without type coercion",
  },
  {
    question: " What is the purpose of the 'return' statement in a function?",
    choices: ["To print a value to the console", "To declare a variable", "To exit the function and return a value", "To concatenate strings"],
    answer: "To exit the function and return a value",
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    choices: ["The global object", "The current function", "The parent object", "The variable being passed to a function"],
    answer: "The global object",
  }
];

var questionIndex = 0;

function startTimer() {
    // to clear any existing intervals before setting a new one
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
      if (timer > 0) {
        timer--;
        timerEl.textContent = timer;
      } else {
        endGame();
      }
    }, 1500);
  }
  
function startGame() {

 questionIndex = 0; // Reset question index
 timer = 20; // Reset timer back to initial value
 timerEl.textContent = timer; // Update timer display
 intro.setAttribute("class", "hide");
 questions.setAttribute("class", "show");
 timerEl.setAttribute("class", "show");
 resultEl.textContent = ""; // Clear any previous result text
 updateQuestion();
 startTimer();


}

function updateQuestion() {
  if (questionIndex === question.length) {
    setTimeout(endGame, 1500);
    return;
  }

  questionEl.textContent = question[questionIndex].question;
  choicesEl.innerHTML = "";
  resultEl.innerHTML = "";
  for (var i = 0; i < question[questionIndex].choices.length; i++) {
    var element = document.createElement("li");
    element.textContent = (i + 1) + ". " + question[questionIndex].choices[i];
    choicesEl.appendChild(element);
  }
}

function endGame() {
    clearInterval(timerInterval); // Stop the timer
    questions.setAttribute("class", "hide");
    resultEl.textContent = "game over";
    timerEl.setAttribute("class", "hide");
    showSubmitScore(); // Show the submit score section
  }

choicesEl.addEventListener("click", function (event) {
  var target = event.target;

  if (target.matches("li")) {
    if (target.textContent === question[questionIndex].answer) {
      resultEl.textContent = "correct";
    }
     else {
      resultEl.textContent = "incorrect";
      timer = timer - 5;
    }

    questionIndex++;

    setTimeout(updateQuestion, 1000);
  }
});

startGameEl.addEventListener("click", startGame);


function showSubmitScore() {
  //questions.classList.add("hide");
  submitScoreEl.classList.remove("hide");
  finalScoreEl.textContent = timer; // Display final score
}

function endGame() {
  clearInterval(timerInterval);
  resultEl.textContent = "game over";
  timerEl.textContent = "0";
  showSubmitScore();
}

startGameEl.addEventListener("click", startGame);

scoreFormEl.addEventListener("submit", function(event) {
  event.preventDefault();
  var initials = initialsInputEl.value;
  var finalScore = timer;
  saveHighscore(initials, finalScore);
  displayHighScores();
});

function saveHighscore(initials, score) {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials: initials, score: score });
  highscores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function displayHighScores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscoreListEl.innerHTML = highscores.map(score => `<li>${score.initials} - ${score.score}</li>`).join("");
  intro.classList.add("hide");
  questions.classList.add("hide");
  submitScoreEl.classList.add("hide");
  highscoresEl.classList.remove("hide");
}

viewHighscoresEl.addEventListener("click", function(event) {
  event.preventDefault();
  displayHighScores();
});

goBackEl.addEventListener("click", function() {
    highscoresEl.classList.add("hide"); // Hide high scores
    intro.classList.remove("hide"); // Show the intro section
    
    // Reset game state
    questionIndex = 0; // Reset to the first question
    timer = 20; // Reset the timer to its initial value
    timerEl.textContent = "Time: " + timer; // Update the timer display
    questions.classList.add("hide"); // To ensure questions are hidden
    resultEl.textContent = ""; // Clear any result message
    choicesEl.innerHTML = ""; // Clear previous choices
    questionEl.textContent = ""; // Clear the question text
});

clearHighscoresEl.addEventListener("click", function() {
  localStorage.removeItem("highscores");
  displayHighScores();
});
