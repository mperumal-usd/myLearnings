
async function start() {
    const quizButton = document.getElementById("quiz-start");
    quizButton.textContent = "next"
    await generateQuestion();
}

async function getQuestions() {
    const apiUrl = 'https://infinite-sands-52519-06605f47cb30.herokuapp.com/v1/personal/vocab';
    // Fetch the json
    const response = await fetch(apiUrl, {
        headers: {
            Authorization: sessionStorage.getItem('sessionToken')
        }
    });
    if (response.status === 401) {
        // Redirect to login page if not authenticated
        window.location.href = "https://mperumal-usd.github.io/myLearnings/Login"; // Replace '/login' with your actual login URL
        return;
    }
    if (!response.ok) {
        return {}
    }
    return response.json()
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Generate a random question
let currentQuestion = null;
async function generateQuestion() {
    let dictionary = await getQuestions()
    const tamilWords = Object.keys(dictionary);
    const segmenter = new Intl.Segmenter("ta", { granularity: "grapheme" });
    const randomTamilWord = tamilWords[Math.floor(Math.random() * tamilWords.length)];
    const englishMeaning = dictionary[randomTamilWord];
    // Randomly decide the question type
    const questionType = Math.random() < 0.5 ? 1 : 2;

    if (questionType === 1) {
        // Ask for Tamil word from English
        currentQuestion = {
            question: `What is the word(s) meaning "${englishMeaning}"?`,
            answer: randomTamilWord
        };

    } else {
        // Ask for the English meaning of jumbled Tamil word
        currentQuestion = {
            question: `What is the meaning of the word(s) "${randomTamilWord}"?`,
            answer: englishMeaning
        };
        const letterBox = document.getElementById("letterBox");
        letterBox.innerHTML = "";
    }

    // Tamil letters to display as buttons
    // Display the question
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('result').innerText = ''; // Clear previous result
    document.getElementById('textInput').value = ''; // Clear input field
}

// Check the user's answer
function checkAnswer() {
    const userAnswer = document.getElementById('textInput').value.trim();
    const resultElement = document.getElementById('result');
    const noSpaces = currentQuestion.answer.replace(/\s+/g, "");
    if (userAnswer === currentQuestion.answer || userAnswer.toLowerCase() === currentQuestion.answer.toLowerCase() || userAnswer === noSpaces) {
        resultElement.innerText = 'Correct!';
        resultElement.style.color = 'green';
    } else {
        resultElement.innerText = `Incorrect. The correct answer is "${currentQuestion.answer}".`;
        resultElement.style.color = 'red';
    }
}
