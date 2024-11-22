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
<div id="columnSelection"></div>
<button id="plotButton" disabled>Plot</button>
<button id="statsButton" disabled>Show Summary Statistics</button>
<button id="histogramButton" disabled>Show Histogram</button>
<!-- <button id="boxplotButton" disabled>Show Boxplot</button>
<button id="qqplotButton" disabled>Show Q-Q Plot</button>
<button id="scatterplotButton" disabled>Show Scatter Plot</button>
<button id="correlationButton" disabled>Show Correlation Matrix</button>
<button id="regressionButton" disabled>Show Regression Plot</button>
<button id="anovaButton" disabled>Show ANOVA Table</button>
<button id="ttestButton" disabled>Show T-Test Results</button>
<button id="chi2Button" disabled>Show Chi-Square Test Results</button>
<button id="ksButton" disabled>Show Kolmogorov-Smirnov Test Results</button>
<button id="shapiroButton" disabled>Show Shapiro-Wilk Test Results</button>
<button id="normalityButton" disabled>Check Normality</button>
<button id="outliersButton" disabled>Check Outliers</button>
<button id="missingButton" disabled>Check Missing Values</button>
<button id="imputeButton" disabled>Impute Missing Values</button>
<button id="transformButton" disabled>Transform Data</button>
<button id="scaleButton" disabled>Scale Data</button>
<button id="encodeButton" disabled>Encode Categorical Data</button>
<button id="splitButton" disabled>Split Data</button>
<button id="trainButton" disabled>Train Model</button>
<button id="predictButton" disabled>Predict</button>
<button id="evaluateButton" disabled>Evaluate Model</button>
<button id="saveButton" disabled>Save Model</button>
<button id="loadButton" disabled>Load Model</button>
<button id="resetButton" disabled>Reset</button>
<button id="downloadButton" disabled>Download</button>
<button id="uploadButton" disabled>Upload</button> -->



<div id="plot"></div>
<div id="statistics"></div>

<script src="{{ site.baseurl }}/scripts/fileUpload.js"></script>
<script src="{{ site.baseurl }}/scripts/statistics.js"></script>

    
<!-- Include Lodash from CDN -->
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jstat@latest/dist/jstat.min.js"></script>


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

