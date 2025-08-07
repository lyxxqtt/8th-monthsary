const unlockTime = new Date('2025-08-11T23:59:00');

// Get references to elements that will be updated dynamically
const countdownEl = document.getElementById('countdown');
const headingEl = document.getElementById('main-heading');
const textEl = document.getElementById('main-text');

let countdownEnded = false; 

// Helper function to format the remaining time as days, hours, minutes, seconds
function formatTime(diff) {
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Function to create and display the PIN clicker interface
function createPinClicker() {
  headingEl.textContent = "What's our PIN? -,-";
  textEl.textContent = "";

  const pinContainer = document.createElement('div');
  pinContainer.classList.add('pin-container');

  const pinDisplay = document.createElement('div');
  pinDisplay.classList.add('pin-display');
  pinDisplay.id = 'pinDisplay';
  pinContainer.appendChild(pinDisplay);

  const pinButtons = document.createElement('div');
  pinButtons.classList.add('pin-buttons');

  let enteredPin = '';

  function updatePinDisplay() {
    pinDisplay.textContent = enteredPin;
  }

  function checkPin() {
    if (enteredPin.length === 6) {
      showModal("TAMA KAYA?...");

      setTimeout(() => {
        if (enteredPin === '121124') {
          showModal("Yieee, tama ang galing!");
          setTimeout(() => {
            window.location.href = 'nextpage.html';
          }, 1500);
        } else {
          hideModal();
          showPinError("ANO BA YAN, NALIMOT MO?!");
          enteredPin = '';
          updatePinDisplay();
        }
      }, 1500); // simulate checking delay
    }
  }

  // Create buttons with delay animation
  const digits = [...Array(10).keys()]; // [0-9]
  digits.forEach((num, index) => {
    const btn = document.createElement('button');
    btn.classList.add('pin-button', 'fade-in');
    btn.textContent = num;
    btn.type = 'button';
    btn.style.animationDelay = `${index * 100}ms`;

    btn.addEventListener('click', () => {
      if (enteredPin.length < 6) {
        enteredPin += num;
        updatePinDisplay();
        checkPin();
      }
    });

    pinButtons.appendChild(btn);
  });

  const backspaceBtn = document.createElement('button');
  backspaceBtn.classList.add('pin-button', 'fade-in');
  backspaceBtn.innerHTML = '<i class="fas fa-delete-left"></i>';
  backspaceBtn.type = 'button';
  backspaceBtn.title = 'Backspace';
  backspaceBtn.style.animationDelay = `${digits.length * 100}ms`;

  backspaceBtn.addEventListener('click', () => {
    enteredPin = enteredPin.slice(0, -1);
    updatePinDisplay();
  });

  pinButtons.appendChild(backspaceBtn);
  pinContainer.appendChild(pinButtons);

  // Error message container
  const pinError = document.createElement('p');
  pinError.id = 'pinError';
  pinError.style.display = 'none';
  pinError.style.color = '#b71c1c';
  pinError.style.marginTop = '1rem';
  pinError.style.fontWeight = '600';
  pinError.style.fontSize = '1rem';
  pinContainer.appendChild(pinError);

  countdownEl.style.display = 'none';
  document.querySelector('.container').appendChild(pinContainer);
}

// Function to update the countdown timer every second
function updateCountdown() {
  const now = new Date();
  const diff = unlockTime - now;

  if (diff <= 0 && !countdownEnded) {
    countdownEnded = true;
    countdownEl.innerHTML = `<a href="#" id="continueBtn"><i class="fas fa-arrow-right"></i> Continue</a>`;
    countdownEl.style.cursor = 'pointer';
    const continueBtn = document.getElementById('continueBtn');
    continueBtn.addEventListener('click', (e) => {
      e.preventDefault();
      createPinClicker();
    });
  } else if (!countdownEnded) {
    countdownEl.textContent = formatTime(diff);
  }
}

// Modal and Feedback Functions
function showModal(message) {
  const modal = document.getElementById('pinModal');
  const msg = document.getElementById('modalMessage');
  if (modal && msg) {
    msg.textContent = message;
    modal.style.display = 'flex';
  }
}

function hideModal() {
  const modal = document.getElementById('pinModal');
  if (modal) modal.style.display = 'none';
}

function showPinError(msg) {
  const err = document.getElementById('pinError');
  const display = document.getElementById('pinDisplay');
  if (err && display) {
    err.textContent = msg;
    err.style.display = 'block';

    display.classList.add('shake');
    setTimeout(() => display.classList.remove('shake'), 300);
  }
}

// Start the countdown
setInterval(updateCountdown, 1000);
updateCountdown();
