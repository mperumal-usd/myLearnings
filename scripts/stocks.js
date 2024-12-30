
async function getStockData(symbol){
    let query=""
    if(number)
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