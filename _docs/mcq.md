---
title: Multiple Choice Questions
category: Tools
order: 6
---
<h1>Multiple Choice Quiz</h1>
<form id="quiz-form">
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
            let score = 0;
            questions.forEach((q, index) => {
                const selectedAnswer = form[`question${index}`].value;
                if (selectedAnswer === q.correctAnswer) {
                    score++;
                }
            });

            const results = document.getElementById('results');
            results.innerHTML = `You scored ${score} out of ${questions.length}.`;
        }

        // Initialize the quiz
        displayQuiz();
</script>
