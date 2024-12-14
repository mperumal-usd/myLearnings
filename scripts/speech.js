
async function speak(){
  const audioPlayer = document.getElementById('audioPlayer');
  const text = document.getElementById('text-to-speak').value;
  speakApi(text,audioPlayer)
}

async function speakApi(text,audioPlayerElement) {
  try {
    // Replace with your API URL that returns audio/mpeg
    const apiUrl ='https://infinite-sands-52519-06605f47cb30.herokuapp.com/text_to_speech?text='+text

    // Fetch the audio file from the API
    const response = await fetch(apiUrl);

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    // Convert the response into a Blob (audio file)
    const audioBlob = await response.blob();

    // Create a URL for the Blob object and set it as the source for the audio player
    const audioUrl = URL.createObjectURL(audioBlob);
    audioPlayerElement.src = audioUrl;

    // Play the audio immediately after setting the source
    audioPlayerElement.play();
  } catch (error) {
    console.error('Error fetching audio:', error);
  }
}


async function getWorkSheet(){
  const apiUrl ='https://infinite-sands-52519-06605f47cb30.herokuapp.com/work_sheet'
   // Fetch the json
   const response = await fetch(apiUrl);
   if (!response.ok){
    return {}
   }
   return response.json()
}

