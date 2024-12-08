---
category: Tools
order: 5
title: Text to Speech

---
 <script src="https://code.responsivevoice.org/responsivevoice.js"></script>
<h1>Text to Speech Example</h1>
<textarea id="text-to-speak" rows="10" cols="50" placeholder="Enter text here..."></textarea><br>
<button onclick="speakText()">Speak</button>

<script>
        function speakText() {
            const text = document.getElementById('text').value;
            responsiveVoice.speak(text, "Tamil Female");
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

<script src="{{ site.baseurl }}/scripts/recorder.js"></script>

