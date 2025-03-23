const questions = [
    { section: "Aptitude", question: "1.What is 50% of 200?", answers: [
        { text: "a) 100", correct: true }, { text: "b) 50", correct: false }, { text: "c)200", correct: false }, { text: "d) 150", correct: false }
    ]},
    { section: "Aptitude", question: "2.Solve: 6 * 7", answers: [
        { text: "a) 42", correct: true }, { text: "b) 49", correct: false }, { text: "c) 36", correct: false }, { text: "d) 56", correct: false }
    ]},{ section: "Aptitude", question: "3.A train 180 m long runs at a speed of 90 km/h. How much time will it take to cross a pole?", answers: [
        { text: "a) 6 sec", correct: false }, { text: "b)  7.2 sec", correct: true }, { text: "c)8 sec", correct: false }, { text: "d)  9 sec", correct: false }
    ]},
    { section: "Aptitude", question: "7.The HCF of two numbers is 12, and their LCM is 240. One number is 48. Find the other.", answers: [
        { text: "a)  60", correct: true }, { text: "b) 48", correct: false }, { text: "c) 72", correct: false }, { text: "d) 36", correct: false }
    ]},
    { section: "Aptitude", question: "8.A train passes a 200 m long platform in 20 seconds. If the train's length is 100 m, find its speed.?", answers: [
        { text: "a) 30 km/h", correct: false }, { text: "b)54 km/h", correct: true }, { text: "c) 60 km/h", correct: false }, { text: "d) 72 km/h", correct: false }
    ]},
    { section: "Verbal", question: "1.Synonym of 'Brave'?", answers: [
        { text: "a) Courageous", correct: true }, { text: "b) Cowardly", correct: false }, { text: "c) Weak", correct: false }, { text: "d) Shy", correct: false }
    ]},
    { section: "Verbal", question: "What is the synonym of 'Eloquent'?", answers: [
        { text: "a) Kind", correct: false }, { text: "b) Selfish", correct: true }, { text: "c)  Helpful", correct: false }, { text: "d)  Polite", correct: false }
    ]},
    
]
    
  

let currentQuestionIndex = 0;
let score = 0;
let totalStars = 0;
let questionsAttempted = 0;
let timer;
let timeLeft = 60;

const sectionTitle = document.getElementById("section-title");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const starsElement = document.getElementById("stars");
const messageElement = document.getElementById("message");
const resultContainer = document.getElementById("result-container");

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    totalStars = 0;
    questionsAttempted = 0;
    resultContainer.style.display = "none";
    document.getElementById("quiz-container").style.display = "block";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    sectionTitle.innerText = currentQuestion.section;
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    nextButton.style.display = "none";
    questionElement.innerHTML = "";
    answerButtons.innerHTML = "";
    starsElement.innerText = "";
    messageElement.innerText = "";
    clearInterval(timer);
    timeLeft = 60;
    timerElement.innerText = `Time Left: ${timeLeft}s`;
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeout();
        }
    }, 1000);
}

function handleTimeout() {
    showStars(0);
    messageElement.innerText = "⏳ Time's up!";
    nextButton.style.display = "block";
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    questionsAttempted++;

    if (selectedButton.dataset.correct) {
        score++;
        selectedButton.style.backgroundColor = "green";
        awardStars(timeLeft);
    } else {
        selectedButton.style.backgroundColor = "red";
        showStars(0);
        messageElement.innerText = "❌ Try Again!";
    }

    nextButton.style.display = "block";
}


function awardStars(timeRemaining) {
    let stars = timeRemaining > 40 ? 3 : timeRemaining > 20 ? 2 : 1;
    totalStars += stars;
    showStars(stars);

    // Set encouraging message based on time
    if (stars === 3) {
        messageElement.innerText = "🌟 Excellent!";
    } else if (stars === 2) {
        messageElement.innerText = "😊 Good!";
    } else {
        messageElement.innerText = "😃 Great!";
    }
}

function handleTimeout() {
    showStars(0);
    messageElement.innerText = "⏳ Time's up!";
    nextButton.style.display = "block";
}

function awardStars(timeRemaining) {
    let stars = timeRemaining > 40 ? 3 : timeRemaining > 20 ? 2 : 1;
    totalStars += stars;
    showStars(stars);

    messageElement.innerText = stars === 3 ? "🌟 Excellent!" : stars === 2 ? "😊 Good!" : "😃 Great!";
}

function showStars(stars) {
    starsElement.innerText = "⭐".repeat(stars);
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    resultContainer.style.display = "block";
    document.getElementById("attempted").innerText = `Questions Attempted: ${questionsAttempted}`;
    document.getElementById("correct").innerText = `Correct Answers: ${score}`;
    document.getElementById("total-stars").innerText = `Total Stars Earned: ${totalStars} ⭐ `;
}

document.getElementById("restart-btn").addEventListener("click", startQuiz);

startQuiz();