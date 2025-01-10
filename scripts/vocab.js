
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
    const myDictionary = Object.keys(dictionary);
    const segmenter = new Intl.Segmenter("ta", { granularity: "grapheme" });
    const randomWord = myDictionary[Math.floor(Math.random() * myDictionary.length)];
    const meaningOfTheWord = dictionary[randomWord];
    // Randomly decide the question type
    const questionType = Math.random() < 0.5 ? 1 : 2;

    if (questionType === 1) {
        // Ask for Tamil word from English
        currentQuestion = {
            question: `What is the word(s) meaning "${meaningOfTheWord}"?`,
            answer: randomWord
        };
        if ('speechSynthesis' in window) {
          speak(meaningOfTheWord);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }

    } else {
        // Ask for the English meaning of jumbled Tamil word
        currentQuestion = {
            question: `What is the meaning of the word(s) "${randomWord}"?`,
            answer: meaningOfTheWord
        };
        const letterBox = document.getElementById("letterBox");
        letterBox.innerHTML = "";
        if ('speechSynthesis' in window) {
            speak(randomWord);
        } else {
            alert('Sorry, your browser does not support text-to-speech.');
        }
    }

    // Tamil letters to display as buttons
    // Display the question
    document.getElementById('question').innerText = currentQuestion.question;
    document.getElementById('result').innerText = ''; // Clear previous result
    document.getElementById('textInput').value = ''; // Clear input field
}

// Check the user's answer
async function checkAnswer() {
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
    await computeSimilarity(userAnswer, currentQuestion.answer);
}

async function computeSimilarity(sentence1, sentence2) {

    if (!sentence1 || !sentence2) {
        alert("Please enter both sentences.");
        return;
    }

    // Load the Universal Sentence Encoder model
    const model = await use.load();

    // Compute embeddings for the sentences
    const embeddings = await model.embed([sentence1, sentence2]);

    // Convert embeddings to arrays
    const embeddingsArray = await embeddings.array();

    // Calculate cosine similarity
    const similarity = cosineSimilarity(embeddingsArray[0], embeddingsArray[1]);

    // Display the result
    document.getElementById('similarity').innerText = `Cosine Similarity: ${similarity.toFixed(4)}`;

    // Dispose of the embeddings tensor to free up memory
    embeddings.dispose();
}

function cosineSimilarity(vecA, vecB) {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
}

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    // Set the voice to an English male voice
    const voices = window.speechSynthesis.getVoices();
    const englishMaleVoice = voices.find(voice => 
        voice.lang.startsWith('en') && voice.name.toLowerCase().includes('male')
    );

    if (englishMaleVoice) {
        utterance.voice = englishMaleVoice;
    } else {
        console.log('Male English voice not found, using default voice.');
    }

    window.speechSynthesis.speak(utterance);
}

// Ensure voices are loaded before finding the desired one
window.speechSynthesis.onvoiceschanged = () => {
    console.log('Voices updated');
};