---
category: Stocks
order: 1
title: Guidance
---
<script src="{{ site.baseurl }}/scripts/stocks.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

#### Stock Data Plotter
<div class="stock_container">
    <form id="stock_form">
        <label id="stock_label" for="symbol">Enter Stock Symbol:</label>
        <input type="text" id="stock_symbol" name="symbol" required>
        <button id="stock_button" type="submit">Get Data</button>
    </form>
    <div id="stock_plot"></div>
</div>

<script>
        document.getElementById('stock_form').addEventListener('submit', async function(event) {
            event.preventDefault();

            const symbol = document.getElementById('stock_symbol').value.trim();
            if (!symbol) {
                alert('Please enter a stock symbol.');
                return;
            }

            try {
                const data = await getStockData(symbol);

                const dates =  data.data.map(entry => entry.date);
                const prices =  data.data.map(entry => entry.adjClose);

                // Plot data using Plotly
                const trace = {
                    x: dates,
                    y: prices,
                    type: 'scatter',
                    mode: 'lines',
                    name: `${symbol} Closing Prices`
                };

                const layout = {
                    title: `Daily Closing Prices for ${symbol}`,
                    xaxis: { title: 'Date' },
                    yaxis: { title: 'Price (USD)' }
                };

                Plotly.newPlot('stock_plot', [trace], layout);
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching or plotting data. Please try again.');
            }
        });
</script>

