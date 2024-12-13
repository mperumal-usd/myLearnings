---
category: Tools
order: 6
title: HSCP 1

---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<script src="{{ site.baseurl }}/scripts/speech.js"></script>


  <div class="chat-container">
    <div class="chat-box" id="chatBox">
    </div>
    <div class="input-area">
        <button id="start-btn">start</button>
        <button id="stop-btn" onclick="sendMessage()" disabled>send</button>
        <p id="transcription"></p>
        <audio id="audioPlayer" controls></audio>
    </div>
  </div>


<script>
    let counter = 0;
    window.onload = function() {
            const workSheet=getWorkSheet();
                   tracker();
    }
    function sendMessage() {
      const userInput = document.getElementById('transcription');
      const message = userInput.textContent.trim();
      
      if (message && workSheet && workSheet.conversations&& workSheet.conversations.length > counter) {
        // Display the sent message
        displayMessage(message, 'sent');
        
        // Clear input field
        userInput.value = '';

        // Simulate receiving a response after a brief delay
          const botResponse = workSheet.conversations[counter];
          counter++;
         const audioPlayer = document.getElementById('audioPlayer');
          displayMessage(botResponse, 'received');
          speakApi(botResponse,audioPlayer)
      }
    }

    // Function to display a message
    function displayMessage(message, type) {
      const chatBox = document.getElementById('chatBox');
      
      const msgElement = document.createElement('div');
      msgElement.classList.add('message', type);
      msgElement.textContent = message;
      
      chatBox.appendChild(msgElement);
      chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
    }

    // Optionally, focus the input field on page load
    window.onload = function() {
      document.getElementById('userInput').focus();
    };
        // Check if the browser supports the Web Speech API
 
        if (!('webkitSpeechRecognition' in window)) {
            alert('Sorry, your browser does not support speech recognition.');
        } else {
        
        window.SpeechRecognition = window.SpeechRecognition
            || window.webkitSpeechRecognition;

        const recognition = new SpeechRecognition();
            recognition.lang = 'ta';
            // const recognition = new webkitSpeechRecognition(); // Create a new instance of SpeechRecognition
                
            recognition.continuous = true; // Keep recognizing speech continuously
            recognition.interimResults = true; // Show interim results

            const startBtn = document.getElementById('start-btn');
            const stopBtn = document.getElementById('stop-btn');
            const transcription = document.getElementById('transcription');

            startBtn.addEventListener('click', () => {
                recognition.start(); // Start the speech recognition
                startBtn.disabled = true;
                stopBtn.disabled = false;
            });

            stopBtn.addEventListener('click', () => {
                recognition.stop(); // Stop the speech recognition
                startBtn.disabled = false;
                stopBtn.disabled = true;
            });

            recognition.onresult = (event) => {
                let interimTranscript = '';
                let finalTranscript = '';

                for (let i = 0; i < event.results.length; i++) {
                    const transcript = event.results[i][0].transcript;
                    if (event.results[i].isFinal) {
                        finalTranscript += transcript;
                    } else {
                        interimTranscript += transcript;
                    }
                }

                transcription.innerHTML = `${finalTranscript}`;
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error detected: ' + event.error);
            };

            recognition.onend = () => {
                startBtn.disabled = false;
                stopBtn.disabled = true;
            };
            
        }
</script>

<!-- ####பேச்ton">பதிவைத் தொடங்கவும்</button>
<button id="speechStopButton" disabled>பதிவு செய்வதை நிறுத்து</button>
<a id="speechDownloadLink" style="display:none;">பதிவிறக்கவும்</a>சைப் பதிவுசெய்து பதிவிறக்கவும்
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>
<button id="speechStartBut -->
<div id="tracker"></div>
<!-- <script src="{{ site.baseurl }}/scripts/recorder.js"></script> -->

