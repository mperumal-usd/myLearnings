
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

document.getElementById('playAudioBtn').addEventListener('click',speak);

async function getWorkSheet(){
  return {
    "intro":[
    "எச் எஸ் சி பி ஒன்றுக்கு உங்களை வரவேற்கிறோம்", "இன்றைய தலைப்பு \"பூங்கா\""
    ],
    "conversations":[
    "நீ பூங்காவிற்கு சென்றிருக்கிறாயா?",
    "பூங்காவில் என்ன பார்த்தாய் ?",
    "பூங்காவில் விளையாட உனக்கு பிடிக்குமா ?",
    "உனக்கு பிடித்த பூங்காவின் பெயர் என்ன ?",
    "பூங்காவில் என்ன செய்வாய் ?"
    ],
    "words": [
    ],
    "test": [
    ]
  };
  const apiUrl ='https://infinite-sands-52519-06605f47cb30.herokuapp.com/workSheet'
   // Fetch the json
   const response = await fetch(apiUrl);
   if (!response.ok){
    return {}
   }
   return response.json()
}

