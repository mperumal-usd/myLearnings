---
category: Machine Learning
order: 1
title:  Exploratary Data Analysis
---

<style>
        /* Basic styling for the collapsible table */
        #dataframe-table {
            display: none; /* Initially hide the table */
            margin-top: 10px;
        }
        .collapsible {
            cursor: pointer;
            padding: 10px;
            background-color: #f1f1f1;
            border: none;
            text-align: left;
            outline: none;
            font-size: 16px;
        }
</style>
<script src="https://cdn.jsdelivr.net/npm/danfojs@0.4.0/lib/bundle.min.js"></script>

<h1>Upload CSV and Display DataFrame</h1>
    <!-- File input for CSV upload -->
<input type="file" id="csvFileInput" accept=".csv" />

    <!-- Button to toggle table visibility -->
<button class="collapsible">Show/Hide Table</button>

    <!-- Container for the table -->
    
<div id="dataframe-table"></div>

<script>
        document.getElementById('csvFileInput').addEventListener('change', handleFileSelect, false);
        document.querySelector('.collapsible').addEventListener('click', toggleTable);

        function handleFileSelect(event) {
            const file = event.target.files[0];
            if (!file) {
                return;
            }

            const reader = new FileReader();
            reader.onload = function(e) {
                const csvData = e.target.result;

                // Use Danfo.js to read CSV data
                dfd.readCSV(csvData).then(df => {
                    // Convert DataFrame to HTML table
                    const tableHTML = df.toString();
                    
                    // Insert the table into the DOM
                    document.getElementById('dataframe-table').innerHTML = tableHTML;
                }).catch(err => {
                    console.error("Error reading CSV file:", err);
                });
            };

            reader.readAsText(file);
        }

        function toggleTable() {
            const tableContainer = document.getElementById('dataframe-table');
            if (tableContainer.style.display === "none") {
                tableContainer.style.display = "block";
            } else {
                tableContainer.style.display = "none";
            }
        }
</script>

