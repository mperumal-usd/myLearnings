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
        <label id="stock_label" for="stock_symbol">Enter Stock Symbol:</label>
        <input type="text" id="stock_symbol" name="symbol" required>
        <button id="stock_button" type="submit">Get Data</button>
    </form>
    <div id="stock_plot"></div>
    <div id="stock_hist"></div>
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
                const result= await calculateBuyAndSell(dates,prices,3,10)

                // Plot data using Plotly
                const trace = {
                    x: dates,
                    y: prices,
                    type: 'scatter',
                    mode: 'lines',
                    name: `${symbol} Closing Prices`
                };

                  const trace1 = {
                    x: result.sellPrices.map(entry => entry.date),
                    y: result.sellPrices.map(entry => entry.price),
                    type: 'scatter',
                    mode: 'markers',
                    name: `${symbol} Sell Signal`
                };

                  const trace2 = {
                    x: result.buyPrices.map(entry => entry.date),
                    y: result.buyPrices.map(entry => entry.price),
                    type: 'scatter',
                    mode: 'markers',
                    name: `${symbol} Buy Signal`
                };

                const layout = {
                    title: `Daily Closing Prices for ${symbol}`,
                    xaxis: { title: 'Date' },
                    yaxis: { title: 'Price (USD)' }
                };

                Plotly.newPlot('stock_plot', [trace,trace1,trace2], layout);

                const trace = {
        x: result.ratio,  // data array
        type: 'histogram',  // specify the type as histogram
        marker: {
            color: 'rgba(0,123,255,0.7)',  // Color of the bars
            line: {
                color: 'rgba(0,123,255,1)',  // Border color
                width: 1  // Border width
            }
        },
        nbinsx: 10,  // Number of bins in the histogram
    };

    // Layout configuration
    const layout = {
        title: 'Sample Histogram',
        xaxis: {
            title: 'Value',
        },
        yaxis: {
            title: 'Frequency',
        },
    };

    // Create the plot
    Plotly.newPlot('plot', [trace], layout);
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while fetching or plotting data. Please try again.');
            }
        });
</script>
