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
                const utterance = new SpeechSynthesisUtterance(text);

                // Set some optional properties, like voice, pitch, and rate
                // utterance.voice = speechSynthesis.getVoices()[0]; // Choose a voice
                // utterance.pitch = 1; // Default is 1
                // utterance.rate = 1; // Default is 1

                // Speak the text
                window.speechSynthesis.speak(utterance);
            } else {
                alert('Sorry, your browser does not support text-to-speech.');
            }
        }
    </script>
