---
category: Machine Learning
order: 5
title: Sentence Embeddings
---

  <h1>Sentence Embeddings and Cosine Similarity</h1>
  <input type="text" id="sentence1" placeholder="Enter first sentence">
  <input type="text" id="sentence2" placeholder="Enter second sentence">
  <button onclick="computeSimilarity()">Compute Cosine Similarity</button>
  <p id="result"></p>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs"></script>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/universal-sentence-encoder"></script>
<style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        input, button {
            margin: 5px 0;
            padding: 10px;
            width: 100%;
            box-sizing: border-box;
        }
        button {
            cursor: pointer;
        }
</style>
<script>
        async function computeSimilarity() {
            const sentence1 = document.getElementById('sentence1').value;
            const sentence2 = document.getElementById('sentence2').value;

            if (!sentence1 || !sentence2) {
                alert("Please enter both sentences.");
                return;
            }

            // Load the Universal Sentence Encoder model
            const model = await use.load();

            // Compute embeddings for the sentences
            const embeddings = await model.embed([sentence1, sentence2]);

            // Convert embeddings to arrays
            const embeddingsArray = await embeddings.array();

            // Calculate cosine similarity
            const similarity = cosineSimilarity(embeddingsArray[0], embeddingsArray[1]);

            // Display the result
            document.getElementById('result').innerText = `Cosine Similarity: ${similarity.toFixed(4)}`;

            // Dispose of the embeddings tensor to free up memory
            embeddings.dispose();
        }

        function cosineSimilarity(vecA, vecB) {
            const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
            const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
            const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
            return dotProduct / (magnitudeA * magnitudeB);
        }
</script>
