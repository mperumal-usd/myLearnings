---
title: Multiple Choice Questions
category: Tools
order: 6
---

<h1>Multiple Choice Quiz</h1>
<form id="quiz-form">
        <label for="name">Enter your name:</label>
        <input type="text" id="name" required><br><br>
        <div id="quiz-container"></div>
        <button type="button" onclick="submitQuiz()">Submit</button>
</form>
<div id="results"></div>

<script>
        const questions = [
            {
                question: "What is the capital of France?",
                choices: ["Berlin", "Madrid", "Paris", "Rome"],
                correctAnswer: "Paris"
            },
            {
                question: "What is 2 + 2?",
                choices: ["3", "4", "5", "6"],
                correctAnswer: "4"
            },
            {
                question: "Which planet is known as the Red Planet?",
                choices: ["Earth", "Mars", "Jupiter", "Saturn"],
                correctAnswer: "Mars"
            }
        ];

function displayQuiz() {
      const quizContainer = document.getElementById('quiz-container');
            questions.forEach((q, index) => {
                const questionDiv = document.createElement('div');
                questionDiv.classList.add('question');
                questionDiv.innerHTML = `<p>${q.question}</p>`;
                
                const choicesList = document.createElement('ul');
                choicesList.classList.add('choices');
                
                q.choices.forEach(choice => {
                    const choiceItem = document.createElement('li');
                    choiceItem.innerHTML = `
                        <label>
                            <input type="radio" name="question${index}" value="${choice}">
                            ${choice}
                        </label>
                    `;
                    choicesList.appendChild(choiceItem);
                });

                questionDiv.appendChild(choicesList);
                quizContainer.appendChild(questionDiv);
            });
        }

        function submitQuiz() {
            const form = document.getElementById('quiz-form');
            const name = document.getElementById('name').value;
            let score = 0;
            questions.forEach((q, index) => {
                const selectedAnswer = form[`question${index}`].value;
                if (selectedAnswer === q.correctAnswer) {
                    score++;
                }
            });

            const resultsText = `Name: ${name}, Score: ${score} out of ${questions.length}.`;
            const key = generateRandomKey(10);
            const encryptedResults = xorEncryptDecrypt(resultsText, key);
            downloadResults(encryptedResults, key);

            const results = document.getElementById('results');
            results.innerHTML = `You scored ${score} out of ${questions.length}.`;
        }

        function xorEncryptDecrypt(text, key) {
            let result = '';
            for (let i = 0; i < text.length; i++) {
                result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
            }
            return result;
        }

        function generateRandomKey(length) {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let key = '';
            for (let i = 0; i < length; i++) {
                key += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return key;
        }

        function downloadResults(content, key) {
            const element = document.createElement('a');
            const file = new Blob([content], {type: 'text/plain'});
            element.href = URL.createObjectURL(file);
            element.download = `quiz_results_${key}.txt`;
            document.body.appendChild(element); // Required for Firefox
            element.click();
            document.body.removeChild(element);
        }

        // Initialize the quiz
        displayQuiz();
</script>
