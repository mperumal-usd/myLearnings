---
title: Basics
category: Statistics
order: 1
---

# Calculate Mean and Median

Enter an array of numbers (comma-separated):

<input type="text" id="numberInput" placeholder="e.g., 1, 2, 3, 4, 5">
<button onclick="calculateStats()">Calculate</button>

<h3>Results:</h3>
<p>Mean: <span id="meanResult"></span></p>
<p>Median: <span id="medianResult"></span></p>


<h1>Upload CSV and Plot</h1>
<input type="file" id="fileInput" accept=".csv" />
<div id="plot"></div>
<script src="{{ site.baseurl }}/scripts/fileUpload.js"></script>
    
<!-- Include Lodash from CDN -->
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<script>
  function calculateStats() {
    const input = document.getElementById('numberInput').value;
    const numbers = _.compact(input.split(',').map(Number));

    if (numbers.length === 0) {
      alert('Please enter valid numbers.');
      return;
    }

    const mean = _.mean(numbers);
    const median = calculateMedian(numbers);

    document.getElementById('meanResult').textContent = mean.toFixed(2);
    document.getElementById('medianResult').textContent = median.toFixed(2);
  }

  function calculateMedian(numbers) {
    numbers.sort((a, b) => a - b);
    const mid = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
      return (numbers[mid - 1] + numbers[mid]) / 2;
    } else {
      return numbers[mid];
    }
  }
</script>

<div class="mermaid">
graph TD
  A[Input] --> B(Validate)
  B --> C{Valid}
  C -- Yes --> D[Calculate]
  C -- No --> E[Show Error]
  D --> F[Display Results]
  E --> F
</div>
