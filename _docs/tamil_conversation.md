---
category: Tools
order: 6
title: HSCP 1

---
<script src="{{ site.baseurl }}/scripts/track.js"></script>
<script src="{{ site.baseurl }}/scripts/speech.js"></script>

<button id="stop-btn" onclick="getExercise()">start exercise</button>

  <div class="chat-container">
    <div class="chat-box" id="chatBox">
    </div>
    <div class="input-area">
        <p type="text" id="userInput"  /></p>
        <button id="start-btn">start</button>
        <button id="stop-btn" onclick="sendMessage()">send</button>
        <audio id="audioPlayer" controls></audio>
    </div>
  </div>


<script>
    let counter = 0;
    let transcriptionStr="";
    let workSheet={
    "intro":[
    "எச் எஸ் சி பி ஒன்றுக்கு உங்களை வரவேற்கிறோம்", "இன்றைய தலைப்பு \"பூங்கா\""
    ],
    "conversations":[
    "நீ பூங்காவிற்கு சென்றிருக்கிறாயா?",
    "பூங்காவில் என்ன பார்த்தாய் ?",
    "பூங்காவில் விளையாட உனக்கு பிடிக்குமா ?",
    "உனக்கு பிடித்த பூங்காவின் பெயர் என்ன ?",
    "பூங்காவில் என்ன செய்வாய் ?"
    ],
    "words": [
    ],
    "test": [
    ]
  };

    async function  getExercise(){
        workSheet=await getWorkSheet();
    }
    
    tracker();
    async function sendMessage() {
      const userInput = document.getElementById('userInput');
      const message =  userInput.textContent.trim();
      
      if ((message || counter==0 ) && workSheet && workSheet.conversations&& workSheet.conversations.length > counter) {
        // Display the sent message
        if(message) {
            displayMessage(message, 'sent');
        }
        
        // Clear input field
        transcriptionStr = '';

        // Simulate receiving a response after a brief delay
        const audioPlayer = document.getElementById('audioPlayer');
        if(counter==0){
                await speakApi(workSheet.intro[0],audioPlayer)
                await speakApi(workSheet.intro[1],audioPlayer)
          }
        let botResponse = workSheet.conversations[counter];
          counter++;
          displayMessage(botResponse, 'received');
         await speakApi(botResponse,audioPlayer)
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
      document.getElementById('start-btn').focus();
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
            const transcription = document.getElementById('userInput');

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
                transcriptionStr=finalTranscript
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

