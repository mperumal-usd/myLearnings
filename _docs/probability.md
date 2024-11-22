---
category: Probability
order: 1
title: basics of Probability
---

<h1>OCR with Tesseract.js</h1>
<input type="file" id="ocrInput" accept="image/*">
<div id="output"></div>

 <script>
        document.getElementById('ocrInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                Tesseract.recognize(
                    file,
                    'tam', // Language code for Tamil
                    {
                        logger: info => console.log(info) // Optional logger
                    }
                ).then(({ data: { text } }) => {
                    document.getElementById('output').innerHTML = text;
                }).catch(err => {
                    console.error(err);
                    document.getElementById('output').innerHTML = 'Error processing image';
                });
            }
        });
</script>
<script src="https://cdn.jsdelivr.net/npm/tesseract.js@2"></script>
