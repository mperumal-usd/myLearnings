
function showStatistics(data) {
  const mean = jStat.mean(data);
  const median = jStat.median(data);
  const stdDev = jStat.stdev(data, true); 
  const statisticsDiv = document.getElementById('statistics');
    statisticsDiv.innerHTML = `
        <h3>Summary Statistics</h3>
        <p>Mean: ${mean}</p>
        <p>Median: ${median}</p>
        <p>Standard Deviation: ${stdDev}</p>
    `;
}

function statsAction() {
  const selectedIndices = getSelectedIndices();
  if (selectedIndices.length < 1) {
      alert("Please select at least one column for statistics.");
      return;
  }

  const file = document.getElementById('fileInput').files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const content = e.target.result;
      const rows = content.split('\n').map(row => row.split(','));
      const data = [];

      for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === rows[0].length) {
              data.push(parseFloat(row[selectedIndices[0]]));
          }
      }

      showStatistics(data);
  };

  reader.readAsText(file);
}

function plotAction() {
  const selectedIndices = getSelectedIndices();
  if (selectedIndices.length < 2) {
      alert("Please select at least two columns to plot.");
      return;
  }

  const file = document.getElementById('fileInput').files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const content = e.target.result;
      const rows = content.split('\n').map(row => row.split(','));
      const x = [];
      const y = [];

      for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === rows[0].length) {
              x.push(row[selectedIndices[0]]);
              y.push(parseFloat(row[selectedIndices[1]]));
          }
      }

      plotData(x, y);
  };

  reader.readAsText(file);
}


/*
* The histogramAction function reads the selected columns from the uploaded CSV file and plots a histogram of the data.
* The plotHistogram function creates a histogram trace using Plotly and displays it in the plot div.
* The plotData function creates a scatter plot trace using Plot

 function histogramAction() {
  const selectedIndices = getSelectedIndices();
  if (selectedIndices.length < 1) {
      alert("Please select at least one column to plot a histogram.");
      return;
  }

  const file = document.getElementById('fileInput').files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
      const content = e.target.result;
      const rows = content.split('\n').map(row => row.split(','));
      const data = [];

      for (let i = 1; i < rows.length; i++) {
          const row = rows[i];
          if (row.length === rows[0].length) {
              data.push(parseFloat(row[selectedIndices[0]]));
          }
      }

      plotHistogram(data);
  };

  reader.readAsText(file);
}

function plotHistogram(data) {
  const trace = {
      x: data,
      type: 'histogram',
      marker: { color: 'blue' }
  };

  const layout = {
      title: 'Histogram',
      xaxis: { title: 'Values' },
      yaxis: { title: 'Frequency' }
  };

  Plotly.newPlot('plot', [trace], layout);
}

function plotData(x, y) {
  const trace = {
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines+markers',
      marker: { color: 'red' }
  };

  const layout = {
      title: 'CSV Data Plot',
      xaxis: { title: 'X Axis' },
      yaxis: { title: 'Y Axis' }
  };

  Plotly.newPlot('plot', [trace], layout);
}