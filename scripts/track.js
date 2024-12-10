
export tracker(){
 const xhr = new XMLHttpRequest();

      // Configure it: GET-request for the URL
      xhr.open('GET', 'https://infinite-sands-52519-06605f47cb30.herokuapp.com/home', true);

      // Set up a callback function to handle the response
      xhr.onload = function () {
        if (xhr.status === 200) {
          // Parse the response and display it
          const response = JSON.parse(xhr.responseText);
          document.getElementById('tracker').innerHTML = `
            <h2>${response.count}</h2>
            <p>${response.hello}</p>
          `;
        } else {
          // Handle errors
          document.getElementById('tracker').textContent = 'Error fetching data.';
        }
      };

      // Handle network errors
      xhr.onerror = function () {
        document.getElementById('tracker').textContent = 'Network error occurred.';
      };

      // Send the request
      xhr.send();
}
