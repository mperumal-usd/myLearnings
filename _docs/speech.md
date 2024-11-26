---
category: Tools
order: 4
title: Text to Speech

---
<h1>Text to Speech Example</h1>
<textarea id="text-to-speak" rows="10" cols="50" placeholder="Enter text here..."></textarea><br>
<button onclick="speakText()">Speak</button>

<script>
        function speakText() {
            // Get the text from the textarea
            const text = document.getElementById('text-to-speak').value;

            // Check if the browser supports speech synthesis
            if ('speechSynthesis' in window) {
                // Create a new SpeechSynthesisUtterance object
                // const utterance = new SpeechSynthesisUtterance("வணக்கம், எப்படி இருக்கிறீர்கள்?");

                 const utterance = new SpeechSynthesisUtterance(text);

                // Set some optional properties, like voice, pitch, and rate
                // utterance.voice = speechSynthesis.getVoices()[0]; // Choose a voice
                // utterance.pitch = 1; // Default is 1
                // utterance.rate = 1; // Default is 1

                // Speak the text
                     // utterance.lang = 'ta-IN';
                 window.speechSynthesis.speak(utterance);
            } else {
                alert('Sorry, your browser does not support text-to-speech.');
            }
        }
</script>

<h1>Speech to Text Example</h1>
<button id="start-btn">Start Listening</button>
<button id="stop-btn" disabled>Stop Listening</button>
<p id="transcription"></p>

<script>
        // Check if the browser supports the Web Speech API
        if (!('webkitSpeechRecognition' in window)) {
            alert('Sorry, your browser does not support speech recognition.');
        } else {
            const recognition = new webkitSpeechRecognition(); // Create a new instance of SpeechRecognition
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

                transcription.innerHTML = `<strong>Final:</strong> ${finalTranscript}<br><strong>Interim:</strong> ${interimTranscript}`;
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

#### Record Speech and Download
<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js"></script>

<button id="speechStartButton">Start Recording</button>
<button id="speechStopButton" disabled>Stop Recording</button>
<a id="speechDownloadLink" style="display:none;">Download Audio</a>

<script src="recorder.js"></script>


#### References
* https://github.com/eeejay/espeak
* https://www.heroku.com/platform?utm_source=google&utm_medium=paid_search&utm_campaign=amer_heraw&utm_content=general-branded-search-rsa&utm_term=heroku&utm_source_platform=GoogleAds&gad_source=1&gclid=CjwKCAiA3ZC6BhBaEiwAeqfvyilrfhdmv6lJ-vWAHVEN5Wgb922FVKo-qJsdq_w23E7SBlEEU_QQ3xoCXj8QAvD_BwE

