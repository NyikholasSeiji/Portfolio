const elements = document.querySelectorAll(".hidden");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
});

elements.forEach((el) => observer.observe(el));

emailjs.init("S-sHCt-gLmBIJ8sPc");

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const btn = document.querySelector(".contact-button");
  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs
    .send("service_2lo4qaj", "template_updwfxf", {
      from_name: name,
      message: message,
    })
    .then(() => {
      alert("Message sent successfully!");
      document.getElementById("form").reset();
    })
    .catch((error) => {
      console.error(error);
      alert("Failed to send. Please try again.");
    })
    .finally(() => {
      btn.textContent = "Send via Email";
      btn.disabled = false;
    });
});

const songs = [
  {
    title: "And So It Begins",
    artist: "Artificial.Music", 
    src: "assets/music/song1.mp3",
    cover: "assets/img/cover1.jpg",
  },
  {
    title: "A Night Alone",
    artist: "TrackTribe", 
    src: "assets/music/song2.mp3",
    cover: "assets/img/cover2.png",
  },
];

let current = 0;
let hideTimeout;
const audio = document.getElementById("audio");
const bar = document.getElementById("music-bar");

function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  document.getElementById("music-title").textContent = song.title;
  document.getElementById("music-artist").textContent = song.artist;
  document.getElementById("music-cover").src = song.cover;
}

function showBar() {
  bar.classList.add("visible");
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(() => bar.classList.remove("visible"), 3000);
}

document.addEventListener("mousemove", (e) => {
  if (e.clientX < 60) showBar();
});

bar.addEventListener("mouseenter", () => {
  bar.classList.add("visible");
  clearTimeout(hideTimeout);
});

bar.addEventListener("mouseleave", () => {
  hideTimeout = setTimeout(() => bar.classList.remove("visible"), 2000);
});

document.getElementById("music-play").addEventListener("click", () => {
  const btn = document.getElementById("music-play");
  if (audio.paused) {
    audio.play();
    btn.textContent = "⏸";
  } else {
    audio.pause();
    btn.textContent = "▶";
  }
});

document.getElementById("music-next").addEventListener("click", () => {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
  document.getElementById("music-play").textContent = "⏸";
});

document.getElementById("music-prev").addEventListener("click", () => {
  current = (current - 1 + songs.length) % songs.length;
  loadSong(current);
  audio.play();
  document.getElementById("music-play").textContent = "⏸";
});

audio.addEventListener("timeupdate", () => {
  if (audio.duration) {
    document.getElementById("music-progress").value =
      (audio.currentTime / audio.duration) * 100;
  }
});

audio.addEventListener("ended", () => {
  current = (current + 1) % songs.length;
  loadSong(current);
  audio.play();
});

document.getElementById("music-progress").addEventListener("input", (e) => {
  audio.currentTime = (e.target.value / 100) * audio.duration;
});

loadSong(current);
