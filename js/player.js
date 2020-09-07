window.addEventListener("DOMContentLoaded", async () => {
  const prevBtn = document.querySelector("#btn-prev");
  const nextBtn = document.querySelector("#btn-next");
  const playBtn = document.querySelector("#btn-play");

  const audio = document.querySelector("#audio");
  const progressBar = document.querySelector("#progress-bar");
  const progressRange = document.querySelector("#progress-range");
  const nameSong = document.querySelector("#name-song");
  const albumSong = document.querySelector("#album-song");
  const imgSong = document.querySelector("#music-cover");
  const imgShadowSong = document.querySelector("#music-shadow-cover");
  const totalDuration = document.querySelector("#total-duration");
  const current_time = document.querySelector("#current-time");
  const volume = document.querySelector("#volume");

  var songIndex = 0;

  const response = await fetch("../songs-data.json");
  const songs = await response.json();

  loadSong(songs[songIndex]);

  function loadSong(song) {
    nameSong.innerText = song.name.replace("-", " ");
    audio.src = `../${song.audioSrc}.mp3`;
    imgSong.src = `../${song.album_cover}.jpg`;
    imgShadowSong.src = `../${song.album_cover}.jpg`;
    albumSong.innerHTML = `${song.artist} - ${song.album}`;
  }

  function playSong() {
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");

    audio.volume = volume.value / 100;

    audio.play();
  }

  function pauseSong() {
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");

    audio.pause();
  }

  function prevSong() {
    songIndex--;

    if (songIndex < 0) {
      songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);

    playSong();
  }

  function nextSong() {
    songIndex++;

    if (songIndex > songs.length - 1) {
      songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
  }

  function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressRange.style.width = `${progressPercent}%`;

    if (progressPercent == 100) nextSong();

    // music duration set
    var min_duration = Math.floor(duration / 60);
    var sec_duration = Math.floor(duration % 60);

    if (duration) {
      totalDuration.innerHTML = `${min_duration}:${sec_duration}`;
    }

    // current duration update

    var min_currentTime = Math.floor(currentTime / 60);
    var sec_currentTime = Math.floor(currentTime % 60);

    if (sec_currentTime < 10) {
      sec_currentTime = `0${sec_currentTime}`;
    }

    let total_currentTime = `${min_currentTime}:${sec_currentTime}`;
    current_time.innerHTML = `${total_currentTime}`;
  }

  function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  }

  // Events Listeners

  playBtn.addEventListener("click", () => {
    const isPlaying = playBtn.classList.contains("fa-play");

    if (isPlaying) {
      imgSong.style.transform = "scale(1)";
      imgShadowSong.style.display = "block";
      playSong();
    } else {
      imgSong.style.transform = "scale(0.9)";
      imgShadowSong.style.display = "none";
      pauseSong();
    }
  });

  prevBtn.addEventListener("click", prevSong);
  nextBtn.addEventListener("click", nextSong);

  audio.addEventListener("timeupdate", updateProgress);
  progressBar.addEventListener("click", setProgress);

  volume.addEventListener("change", (e) => {
    if (e.target.value == 100) {
      audio.volume = 1;
    } else {
      audio.volume = e.target.value / 100;
    }
  });
});
