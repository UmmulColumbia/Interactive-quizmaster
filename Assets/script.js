
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



var timer = 15;
var timerInterval;

var question = [
  {
    question: "this is not a character in harry potter",
    choices: ["harry", "hermione", "ron", "bugs bunny"],
    answer: "bugs bunny",
  },
  {
    question: "how many harry potter movies are there",
    choices: ["1", "2", "3", "8"],
    answer: "8",
  },
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
    }, 1000);
  }
  
function startGame() {
  intro.setAttribute("class", "hide");
  updateQuestion();
  questions.setAttribute("class", "show");
  timerEl.setAttribute("class", "show");
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
    element.textContent = question[questionIndex].choices[i];
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
    } else {
      resultEl.textContent = "incorrect";
      timer = timer - 5;
    }

    questionIndex++;

    setTimeout(updateQuestion, 1500);
  }
});

startGameEl.addEventListener("click", startGame);



function showSubmitScore() {
  questions.classList.add("hide");
  submitScoreEl.classList.remove("hide");
  finalScoreEl.textContent = timer;
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
  highscoresEl.classList.add("hide");
  intro.classList.remove("hide");
});

clearHighscoresEl.addEventListener("click", function() {
  localStorage.removeItem("highscores");
  displayHighScores();
});
