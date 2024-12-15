---
category: Tools
order: 7
title: தமிழ் quiz
---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<h1>Tamil-English Quiz</h1>
    <div class="question-box">
        <div class="question" id="question"></div>
        <div class="letter-box" id="letterBox"></div>
        <textarea class="input-box" id="textInput" rows="3"></textarea>
        <button class="clear-button" onclick="clearInput()">Clear</button>
        <!-- <input type="text" id="answer" placeholder="Enter your answer here" /> -->
        <button onclick="checkAnswer()">Submit</button>
    </div>

<div class="result" id="result"></div>


<script src="{{ site.baseurl }}/scripts/dictation.js"></script>