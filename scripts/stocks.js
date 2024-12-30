
async function getStockData(symbol){
    let query=""
    if(symbol)
        query+="stock="+symbol+"&";
    const apiUrl ='https://infinite-sands-52519-06605f47cb30.herokuapp.com/stocks'+ (query.length > 0 ? "?"+query :"");
     // Fetch the json
    const response = await fetch(apiUrl,{ headers: {
    Authorization: sessionStorage.getItem('sessionToken')
        }});
    if (response.status === 401) {
      // Redirect to login page if not authenticated
    window.location.href = "https://mperumal-usd.github.io/myLearnings/Login"; 
    return;
    }
    if (!response.ok){
        return {}
    }
    return response.json()
}

function findGreaterThanOrEqual(list, threshold) {
    // Result array to hold index and value pairs
    const result = [];

    // Iterate through the list
    list.forEach((item, index) => {
        if (!isNaN(item) && item >= threshold) {
            result.push({ index: index, value: item });
        }
    });
    return result;
}

function getByPrices(prices,dates,signals){
    const result = [];
// Iterate through the list
signals.forEach((item) => {
        result.push({ date: dates[item.index], price: prices[item.index] });
});
return result;
}

function findLessThanOrEqual(list, threshold) {
    // Result array to hold index and value pairs
    const result = [];

    // Iterate through the list
    list.forEach((item, index) => {
        if (!isNaN(item) && item <= threshold) {
            result.push({ index: index, value: item });
        }
    });

    return result;
}

// Function to shift a list by a given window size, filling the beginning with NaN
function shiftWithNaN(arr, windowSize) {
    if (windowSize <= 0) {
        throw new Error("Window size must be a positive integer.");
    }

    // Create a new array with NaN values for the first 'windowSize' elements
    const result = new Array(windowSize).fill(NaN);
    
    // Shift the array and copy the remaining elements
    for (let i = 0; i < arr.length - windowSize; i++) {
        result.push(parseFloat(arr[i]));  // Ensure the values are treated as float
    }
    return result;
}

// Function to subtract and divide element-wise by the shifted list
function shiftSubtractDivide(list, windowSize) {
    // Step 1: Shift the list
    const shiftedList = shiftWithNaN(list, windowSize);

    // Step 2: Perform element-wise subtraction and division
    const result = list.map((item, index) => {
        const shiftedItem = shiftedList[index];
        
        // If either value is NaN or the shifted value is 0, the result should be NaN
        if (isNaN(item) || isNaN(shiftedItem) || shiftedItem === 0) {
            return NaN;
        }

        // Perform element-wise subtraction, then divide by the shifted value
        const difference = parseFloat(item) - shiftedItem;  // Ensure float subtraction
        return difference / shiftedItem;  // Ensure float division
    });

    return result;
}
        /**
 * Computes the rolling mean of an array with a given window size.
 * @param {number[]} data - The input array of numbers.
 * @param {number} windowSize - The size of the rolling window.
 * @returns {number[]} - Array of rolling means; NaN for positions where the window is incomplete.
 */
function rollingMean(data, windowSize) {
    const result = Array(data.length).fill(NaN);
    for (let i = windowSize - 1; i < data.length; i++) {
        const window = data.slice(i - windowSize + 1, i + 1);
        const mean = window.reduce((sum, value) => sum + value, 0) / windowSize;
        result[i] = mean;
    }
    return result;
}

function calculateStats(list) {
    // Filter out NaN values
    const validValues = list.filter(value => !isNaN(value));

    if (validValues.length === 0) {
        return { mean: NaN, std: NaN, LQA: NaN, UQA: NaN, median: NaN };  // If no valid values, return NaN for all
    }

    // Calculate the mean
    const mean = validValues.reduce((sum, value) => sum + value, 0) / validValues.length;

    // Calculate the standard deviation
    const variance = validValues.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) / validValues.length;
    const std = Math.sqrt(variance);

    // Sort the valid values for calculating LQA, UQA, and median
    validValues.sort((a, b) => a - b);

    // Calculate the lower quartile (25th percentile)
    const LQA = validValues[Math.floor(0.25 * (validValues.length + 1)) - 1]; // 25th percentile

    // Calculate the upper quartile (75th percentile)
    const UQA = validValues[Math.floor(0.75 * (validValues.length + 1)) - 1]; // 75th percentile

    // Calculate the median (50th percentile)
    const midIndex = Math.floor(validValues.length / 2);
    let median;
    if (validValues.length % 2 === 0) {
        // If even, take the average of the two middle values
        median = (validValues[midIndex - 1] + validValues[midIndex]) / 2;
    } else {
        // If odd, the middle value is the median
        median = validValues[midIndex];
    }

    return { mean, std, LQA, UQA, median };
}



// Function to calculate Buy and Sell signals
async function calculateBuyAndSell(dates,prices, mva, lookBack) {
                const meanPrices = rollingMean(prices, mva)
                const shiftRatio = shiftSubtractDivide(meanPrices, lookBack)
                const result = calculateStats(shiftRatio)
                const lowerThreshold = result.mean - result.std;
                const upperThreshold = result.mean + result.std;
                const sellSignals = findGreaterThanOrEqual(shiftRatio, upperThreshold);
                const buySignals = findLessThanOrEqual(shiftRatio, lowerThreshold);
                const sellPrices = getByPrices(prices, dates, sellSignals)
                const buyPrices = getByPrices(prices, dates, buySignals)
            return {'sellPrices':sellPrices,'buyPrices':buyPrices,"ratio":shiftRatio,"stats":result}
}

