const saveButton = document.getElementById("saveButton");
const passwordModal = document.getElementById("passwordModal");
const overlay = document.getElementById("overlay");
const cancelButton = document.getElementById("cancelButton");
const submitButton = document.getElementById("submitButton");

// Show the modal when the Save button is clicked
saveButton.addEventListener("click", () => {
    passwordModal.style.display = "block";
    overlay.style.display = "block";
});

// Hide the modal when the Cancel button is clicked
cancelButton.addEventListener("click", () => {
    passwordModal.style.display = "none";
    overlay.style.display = "none";
});

// Optional: Hide the modal when clicking outside it
overlay.addEventListener("click", () => {
    passwordModal.style.display = "none";
    overlay.style.display = "none";
});

// Form submission
const passwordForm = document.getElementById("passwordForm");
submitButton.addEventListener("click", (event) => {
const passwordInput = document.getElementById("passwordInput").value;
    if (!passwordInput) {
        alert("Please enter your password.");
        event.preventDefault(); // Stop form submission
    }
    const chatBox = document.getElementById("chatBox");

    // Get all messages inside the chat box
    const messages = chatBox.querySelectorAll(".message");

    // Optional: Store all message values in an array
    const messageArray = Array.from(messages).map(message => message.textContent.trim());
    console.log(messageArray);
    fetch('https://infinite-sands-52519-06605f47cb30.herokuapp.com/save_conversation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password , content: messageArray }),
    })
        .then(response => response.json())
        .then(data => {
            alert('Work saved successfully! ' +data.id ? data.id : "");
            document.getElementById('passwordModal').style.display = 'none';
        })
        .catch(error => {
            alert('Failed to save work.');
        });
});