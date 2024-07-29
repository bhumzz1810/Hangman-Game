/* STUDENT NAME: BHUMIL PARATE & STUDENT NUMBER: 8994642 */
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");
const finalMessageRevealWord = document.getElementById(
  "final-message-reveal-word"
);

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wizard"];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Show hidden word with correct guessed letters
const displayWord = () => {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) => `
          <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
          </span>
        `
      )
      .join("")}
  `;

  // Remove line breaks from the displayed word
  const innerWord = wordEl.innerText.replace(/\n/g, "");

  // Check if the player has guessed the word correctly
  if (innerWord === selectedWord) {
    finalMessage.innerText = "Congratulations! You won!";
    finalMessageRevealWord.innerText = "";
    popup.style.display = "flex";
  }
};

// Update the wrong letters and figure parts based on incorrect guesses
const updateWrongLettersEl = () => {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
    ${wrongLetters.map((letter) => `<span>${letter}</span>`).join(", ")}
  `;

  // Display the parts of the hangman figure based on the number of wrong guesses
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });

  // Check if the player has lost the game
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = "Unfortunately you lost.";
    finalMessageRevealWord.innerText = `...the word was: ${selectedWord}`;
    popup.style.display = "flex";
  }
};

// Show notification when a letter has already been guessed
const showNotification = () => {
  notification.classList.add("show");

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 5000);
};

// Handle letter key presses
window.addEventListener("keydown", (e) => {
  // Check if the key pressed is a letter
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    // Check if the letter is in the selected word
    if (selectedWord.includes(letter)) {
      // Check if the letter has not been guessed already
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);

        displayWord();
      } else {
        showNotification();
      }
    } else {
      // Check if the letter has not been guessed already
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);

        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

// Restart game when the "Play Again" button is clicked
playAgainBtn.addEventListener("click", () => {
  // Empty arrays of correct and wrong letters
  correctLetters.splice(0);
  wrongLetters.splice(0);

  // Select a new word
  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();
  updateWrongLettersEl();

  popup.style.display = "none";
});

// Initial call to display the hidden word
displayWord();
