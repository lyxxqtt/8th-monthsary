/*
  Script for button click na magsisimula ng countdown animation.
  - May countdown mula 6 pababa.
  - Pag 3 na, mag-fade out yung countdown, lalabas yung message for 3 seconds.
  - Tapos balik ulit countdown pero from 2 to 0.
  - Pag zero, lalabas final message box.
  - May play button para i-play yung audio at ipakita ang mga lyrics na naka-fade in/out isa-isa.
  - Smooth transition gamit ang fadeIn/fadeOut functions para sa mga elemento.
*/

document.addEventListener('DOMContentLoaded', () => {
  // Get elements
  const clickBtn = document.getElementById('clickBtn');
  const countdown = document.getElementById('countdown');
  const message = document.getElementById('message');
  const finalMessage = document.getElementById('finalMessage');
  const playBtn = document.getElementById('playBtn');
  const lyricsContainer = document.getElementById('lyrics');

  // Attach event listener to playBtn
  playBtn.addEventListener('click', playOnce);

  // Start button click
  clickBtn.addEventListener('click', () => {
    fadeOut(clickBtn, () => {
      clickBtn.style.display = 'none';
      startCountdown();
    });
  });

  function startCountdown() {
    let count = 6;

    countdown.textContent = count;
    showElement(countdown);

    const interval = setInterval(() => {
      count--;
      countdown.textContent = count;

      if (count === 3) {
        clearInterval(interval);
        fadeOut(countdown, () => {
          countdown.style.display = 'none';
          showElement(message);

          setTimeout(() => {
            fadeOut(message, () => {
              message.style.display = 'none';
              showElement(countdown);
              continueCountdown(2);
            });
          }, 3000);
        });
      }
    }, 1000);
  }

  function continueCountdown(start) {
    let count = start;
    countdown.textContent = count;

    const interval = setInterval(() => {
      count--;
      countdown.textContent = count;

      if (count === 0) {
        clearInterval(interval);
        fadeOut(countdown, () => {
          countdown.style.display = 'none';
          showElement(finalMessage);
        });
      }
    }, 1000);
  }

  // Reusable functions
  function fadeOut(element, callback) {
    element.style.transition = 'opacity 0.5s ease';
    element.style.opacity = '0';
    element.classList.remove('show');

    setTimeout(() => {
      if (callback) callback();
    }, 500);
  }

  function showElement(element) {
    element.style.display = 'block';
    element.style.opacity = '0';
    element.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
      element.style.opacity = '1';
      element.classList.add('show');
    }, 50);
  }

  function playOnce() {
  const audio = new Audio('assets/style/audio/pusong-ligaw.mp3');
  audio.play().catch(err => console.error("Failed to play:", err));

  fadeOut(finalMessage, () => {
    finalMessage.style.display = 'none';
    lyricsContainer.innerHTML = '';
    showElement(lyricsContainer);

    const lyrics = [
      { text: "Ikaw ang patutunguhan at pupuntahan", duration: 7000, fadeInDuration: 800, fadeOutDuration: 1000 },
      { text: "Pag-ibig mo", duration: 4500, fadeInDuration: 500, fadeOutDuration: 800 },
      { text: "ang hanap ng pusong ligaw", duration: 4290, fadeInDuration: 550, fadeOutDuration: 200 },
      { text: "Mula noon bukas at kailanman", duration: 4300, fadeInDuration: 1000, fadeOutDuration: 2500 },
      { text: "Love you so much, bal. Happy 8th monthsary! Every day with you feels like a little piece of forever. Thank you for loving me the way you do. Here's to more months, more memories, and more love :3", duration: 999999, fadeInDuration: 1000, fadeOutDuration: 0 } // ✅ final line that stays
    ];

    let index = 0;

    function showNextLine() {
      if (index >= lyrics.length) {
        // All lines done; optionally hide lyrics or do something else
        fadeOut(lyricsContainer, () => {
          lyricsContainer.style.display = 'none';
        });
        return;
      }

      const currentLine = lyrics[index];

      lyricsContainer.innerHTML = ''; // Clear previous line

      const p = document.createElement('p');
      p.textContent = currentLine.text;
      p.style.opacity = '0';
      p.style.transition = 'opacity 1s ease';
      p.style.fontSize = '28px';
      p.style.fontWeight = 'bold';
      p.style.color = '#d6336c';
      p.style.fontFamily = "'Pacifico', cursive";
      lyricsContainer.appendChild(p);

      // Smooth fade in over 1s
      setTimeout(() => {
        p.style.opacity = '1';
      }, 50);

      // Keep fully visible for (duration - 2000ms) to allow fade out
      // Start fade out 2s before next line shows for smooth transition
      setTimeout(() => {
        p.style.opacity = '0';
      }, currentLine.duration - 1000);

      // After fade out (2s), show next line
      setTimeout(() => {
        index++;
        showNextLine();
      }, currentLine.duration);

    }

    showNextLine();
  });

  // Prevent second click
  playBtn.removeEventListener('click', playOnce);
}

});
