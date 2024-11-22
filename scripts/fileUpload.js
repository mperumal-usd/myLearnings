document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const rows = content.split('\n').map(row => row.split(','));
        if (rows.length > 0) {
            const headers = rows[0];
            displayColumnSelection(headers);
            document.getElementById('plotButton').disabled = false;
        }
    };

    reader.onerror = function() {
        console.error("Could not read the file");
    };

    reader.readAsText(file);
});

function displayColumnSelection(headers) {
    const columnSelectionDiv = document.getElementById('columnSelection');
    columnSelectionDiv.innerHTML = ''; // Clear previous content

    headers.forEach((header, index) => {
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = index;
        checkbox.checked = index < 2; // Pre-select the first two columns
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(header));
        columnSelectionDiv.appendChild(label);
        columnSelectionDiv.appendChild(document.createElement('br'));
    });
}

document.getElementById('plotButton').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('#columnSelection input[type="checkbox"]');
    const selectedIndices = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedIndices.push(parseInt(checkbox.value));
        }
    });

    if (selectedIndices.length < 2) {
        alert("Please select at least two columns to plot.");
        return;
    }

    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];
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
});

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
