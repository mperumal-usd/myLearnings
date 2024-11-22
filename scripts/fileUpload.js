document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0]; // Get the first selected file
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        processCSV(content);
    };

    reader.onerror = function() {
        console.error("Could not read the file");
    };

    reader.readAsText(file);
});

function processCSV(data) {
    const rows = data.split('\n').map(row => row.split(','));
    
    // Assuming the first row contains column names
    const headers = rows[0];
    const x = [];
    const y = [];

    // Assuming the data starts from the second row
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (row.length === headers.length) { // Check if the row has the correct number of columns
            x.push(row[0]); // Assume the first column is for x-axis
            y.push(parseFloat(row[1])); // Assume the second column is for y-axis
        }
    }

    plotData(x, y);
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
