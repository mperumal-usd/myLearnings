
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
