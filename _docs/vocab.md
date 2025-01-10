---
category: Tools
order: 10
title: vocab
---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<h1>vocab</h1>
<button class="quiz start-button" id="quiz-start" onclick="start(this)">start</button>
<div class="question-box">
    <div class="question" id="question"></div>
     <div class="letter-box" id="letterBox"></div>
    <textarea class="input-box" id="textInput" rows="3"></textarea>
    <button class="clear-button" onclick="clearInput()">Clear</button>
    <button onclick="checkAnswer()">Submit</button>
</div>

<div class="result" id="result"></div>
<p id="similarity"></p>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder"></script>

<script src="{{ site.baseurl }}/scripts/vocab.js"></script>
