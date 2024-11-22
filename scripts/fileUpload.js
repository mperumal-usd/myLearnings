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
            document.getElementById('statsButton').disabled = false;
            document.getElementById('histogramButton').disabled = false;
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

document.getElementById('plotButton').addEventListener('click', plotAction);
document.getElementById('statsButton').addEventListener('click', statsAction);
document.getElementById('histogramButton').addEventListener('click', histogramAction);

function getSelectedIndices() {
    const checkboxes = document.querySelectorAll('#columnSelection input[type="checkbox"]');
    const selectedIndices = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedIndices.push(parseInt(checkbox.value));
        }
    });

    return selectedIndices;
}


