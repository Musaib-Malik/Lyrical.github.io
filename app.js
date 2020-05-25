// UI Variables
const song = document.querySelector("#song");
const artist = document.querySelector("#artist");
const submitBtn = document.querySelector(".btn");
const result = document.querySelector(".output");
const resultTitle = document.querySelector(".resultTitle");
const container = document.querySelector(".container");
const spinner = document.querySelector('.spinner');

// Event Handler
submitBtn.addEventListener("click", getLyrics);

// Get Lyrics
async function getLyrics() {
  // Reload Page
  if (submitBtn.textContent === "Reset") {
    window.location.reload();
  } else {
    // Validate Form
    if (song.value === "" || artist.value === "") {
      showAlert("Please Fill in all the fields");
    } else {
      showSpinner()
      // Fetch Lyrics
      const response = await fetch(
        `https://api.lyrics.ovh/v1/${artist.value}/${song.value}`
      ).catch(err => {
        hideSpinner()
        showAlert('Please check your internet connection.')
      })
      if (response.ok) {
        const data = await response.json();

        hideSpinner();

        // Display the Result
        resultTitle.style.display = "block";
        result.innerHTML += data.lyrics.replace(new RegExp("\n", "g"), "<br>");
        container.style.display = "none";

        submitBtn.style.marginTop = "2em";
        result.style.borderTop = "1px white solid";

        submitBtn.textContent = "Reset";
        submitBtn.style.padding = "7px 15px";
      } else {

        spinnerTimeout();
        showAlert("Song not found!");
        song.value = "";
        artist.value = "";
      }
    }
  }
}

// Alert Function
function showAlert(message) {
  const errorDiv = document.createElement("div");

  errorDiv.className = "error";

  errorDiv.appendChild(document.createTextNode(message));

  const wrapper = document.querySelector(".wrapper");

  const container = document.querySelector(".container");

  wrapper.insertBefore(errorDiv, container);

  setTimeout(() => {
    document.querySelector(".error").remove();
  }, 2500);
}

function showSpinner() {
  spinner.style.display = 'block';
  submitBtn.style.visibility = 'hidden'
}

function hideSpinner() {
  spinner.style.display = 'none';
  submitBtn.style.visibility = 'visible'

}

function spinnerTimeout() {
  setTimeout(() => {
    spinner.style.display = 'none';
  }, 1000)

  setInterval(() => {
    submitBtn.style.visibility = 'visible'
  }, 1100)
}