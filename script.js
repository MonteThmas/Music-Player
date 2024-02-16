const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeElement = document.getElementById('current-time');
const durationElement = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');


//Music
const song = [
    {
        name: 'atdatime',
        displayName: "Kill Ya Groove",
        artist: 'MontéSpeaks',
    },
    {
        name: 'foraminute',
        displayName: "For A Minute",
        artist: 'MontéSpeaks',
    },
    {
        name: 'lookinback',
        displayName: "Lookin' Back",
        artist: 'MontéSpeaks',
    },
    {
        name: 'thoughts',
        displayName: "Thoughts",
        artist: 'MontéSpeaks',
    },
];


//Check if song is playing

let isPlaying = false;


//Play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();

}

//Pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
    
}

//Play or Pause Event Listener
playBtn.addEventListener('click',() => (isPlaying ? pauseSong() : playSong()));

//Update the DOM

function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = song.length -1;

    }
    loadSong(song[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > song.length -1) {
        songIndex = 0;
    }
    loadSong(song[songIndex]);
    playSong();
}

//On Load - Select first song
loadSong(song[songIndex]);

//Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration , currentTime } = e.srcElement;

        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration

        const durationMinutes = Math.floor(duration/60);
        console.log('minutes', durationMinutes);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        console.log('seconds' , durationSeconds);
        //Delay switching duration element to avoid NAN
        if (durationSeconds){
            durationElement.textContent = `${durationMinutes}: ${durationSeconds}`;
        }
        //calculate display for current seconds
        const currentMinutes = Math.floor(currentTime / 60);
        console.log('minutes', currentMinutes);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds <10){
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeElement.textContent = `${currentMinutes}:${currentSeconds}`
    }
}


//Set Progresss Bar 
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration} = music;
    music.currentTime = (clickX / width) * duration;



}


//Event Listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended' , nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);