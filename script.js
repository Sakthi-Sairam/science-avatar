function runSpeechRecognition() {
    
    var output = document.getElementById("output");
    
    var action = document.getElementById("action");
   
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();

   
    recognition.onstart = function() {
        action.innerHTML = "<small>listening, please speak...</small>";
    };
    
    recognition.onspeechend = function() {
        action.innerHTML = "<small>stopped listening, hope you are done...</small>";
        recognition.stop();
    }
  
   
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;

        // output.innerHTML = "<b>Text:</b> " + transcript;
        getChatGPTResponse(transcript+" give it in one line");
       
        output.classList.remove("hide");
    };
  
     // start recognition
     recognition.start();

}

function speak(textToRead) {

if ('speechSynthesis' in window) {
const utterance = new SpeechSynthesisUtterance(textToRead);
speechSynthesis.speak(utterance);
} else {
alert('Text-to-speech is not supported in this browser. Please use a modern browser.');
}
}


// openai api------------------
async function getChatGPTResponse(userInput) {
    var output = document.getElementById("output");
    const apiKey = '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'; // actual API key

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            messages: [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": userInput},
            ],
            model: "gpt-3.5-turbo",
        }),
    });

    const data = await response.json();
    const assistantResponse = data.choices[0].message.content;

    console.log("Assistant:", assistantResponse);
    output.innerHTML = "<b>Answer:</b> " + assistantResponse;
    speak(assistantResponse);
}


// ------------------popup-----------
const messages = ["Hi i'm your science avatar", "Welcome to science learning HUB", "Ask your questions by clicking the chat button. I answer by using custom knowledge base", "To talk with me click on the below button"];
let currentIndex = 0;

function showPopup() {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popupText');

    popupText.innerText = messages[currentIndex];
    popup.style.display = 'block';

   
    setTimeout(() => {
        popup.style.display = 'none';
        currentIndex = (currentIndex + 1) % messages.length;



        showPopup();
    }, 3800);
}

showPopup();
