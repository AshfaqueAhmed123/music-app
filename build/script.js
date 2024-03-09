// dom elements and variables
let songsContainer = document.querySelector(".songsContainer");
let songItems;
let seekBar = document.getElementById("song-duration");
let playPauseBtn = document.getElementById("playPause-btn");
let nextBtn = document.getElementById("next-btn");
let previousBtn = document.getElementById("previous-btn");
let playingSongScreen = document.getElementById("playing-song-container");
let currentSongIndex = 0;

//songs array 
let songs = [
  {
    song: new Audio('./songs/1.mp3'),
    tittle:"this is first song",
    songImg:"1.jpg",
    id:1,
  },
  {
    song: new Audio('./songs/2.mp3'),
    tittle:"this is second song",
    songImg:"2.jpg",
    id:2,
  },
  {
    song: new Audio('./songs/3.mp3'),
    tittle:"this is third song",
    songImg:"3.jpg",
    id:3,
  },
  {
    song: new Audio('./songs/4.mp3'),
    tittle:"this is fourth song",
    songImg:"4.jpg",
    id:4,
  },
  {
    song: new Audio('./songs/5.mp3'),
    tittle:"this is fifth song",
    songImg:"5.jpg",
    id:5,
  },
  {
    song: new Audio('./songs/6.mp3'),
    tittle:"this is sixth song",
    songImg:"6.jpg",
    id:6,
  },
  {
    song: new Audio('./songs/7.mp3'),
    tittle:"this is seventh song",
    songImg:"7.jpg",
    id:7,
  },
  {
    song: new Audio('./songs/8.mp3'),
    tittle:"this is eighth song",
    songImg:"8.jpg",
    id:8,
  },
  {
    song: new Audio('./songs/9.mp3'),
    tittle:"this is nineth song",
    songImg:"9.jpg",
    id:9,
  },
  {
    song: new Audio('./songs/dhoom3song.mp4'),
    tittle:"dhoom 3 song",
    songImg:"images.jpeg",
    id:10,
  },
  {
    song: new Audio('./songs/10.mp3'),
    tittle:"this is thenth song",
    songImg:"10.jpg",
    id:11,
  },
];

// functions
function createSongItem(song,tittle, songImg, songId) {
  let songDuration = Math.floor(song.duration/60)+' min';
  let songItem = document.createElement("div");
  songItem.setAttribute(
    "class",
    "songItem bg-white text-black rounded-xl my-2 m-auto p-2 flex items-center justify-between w-full mt-3"
  );
  songItem.style.height = '80px';
  songItem.innerHTML = `
        <div class="image">
          <img src="./images/covers/${songImg}" width="50px" style="border-radius: 50%" />
        </div>
        <div class="tittle">${tittle}</div>
        <div class="controls flex items-center justify-between">
          <div class="play-icon" onclick='playSong(this.parentElement.parentElement.id)'>
            <img src="images/circle-play-solid-white.svg" width="35px" class="cursor-pointer" />
          </div>
          <span class="duration ml-3">${songDuration}</span>
        </div>
  `
  songItem.id = songId;
  songsContainer.appendChild(songItem)
}


function fillPlayingCardDetails(){
  playingSongScreen.firstElementChild.firstElementChild.innerHTML = songs[currentSongIndex].tittle;
  playingSongScreen.children[1].firstElementChild.style.backgroundImage = `url('./images/covers/${songs[currentSongIndex].songImg}')`
  // console.log(playingSongScreen.children[1].firstElementChild);
  playingSongScreen.firstElementChild.nextElementSibling.firstElementChild.nextElementSibling.innerHTML = `${currentSongIndex} / ${songs.length-1}`
}

function playSong(id){
  for(let i=0; i<songs.length; i++){
    songs[i].song.pause();
  }
  currentSongIndex = Number.parseInt(id);
  songs[currentSongIndex].song.play();
  playingSongScreen.classList.remove('hidden');
  fillPlayingCardDetails()

  songs[currentSongIndex].song.ontimeupdate = function () {
    seekBar.value = ((songs[currentSongIndex].song.currentTime/songs[currentSongIndex].song.duration)*100)
  }
}

function pauseSong(id){
  currentSongIndex = Number.parseInt(id);
  songs[currentSongIndex].song.pause();
}

function resetSong(id){
  for(let i=0; i<songs.length; i++){
    songs[i].song.pause();
  }
  currentSongIndex = Number.parseInt(id);
  songs[currentSongIndex].song.currentTime = 0;
}

function stopSong(){
  for(let i=1; i<songs.length; i++){
    songs[i].song.pause();
    songs[i].song.currentTime = 0;
    playPauseBtn.firstElementChild.src = './images/circle-pause-solid.svg'
    playingSongScreen.classList.add("hidden")
  }
}

//events handling
window.onload = function(){
  // create few songs 
  for(let i=0; i<10; i++){
    createSongItem(songs[i].song, songs[i].tittle, songs[i].songImg, songs[i].id)
  }
  songsContainer.lastElementChild.remove();
}


playPauseBtn.addEventListener('click',(e)=>{
 if(playPauseBtn.classList.contains("pausebtn")){
  playPauseBtn.classList.remove('pausebtn');
  playPauseBtn.classList.add("playbtn")
  playPauseBtn.firstElementChild.setAttribute('src','./images/circle-play-solid.svg');
  pauseSong(currentSongIndex)
 }
 else if(playPauseBtn.classList.contains('playbtn')){
  playPauseBtn.classList.add('pausebtn');
  playPauseBtn.classList.remove("playbtn")
  playPauseBtn.firstElementChild.setAttribute('src','./images/circle-pause-solid.svg')
  playSong(currentSongIndex)
 }
})

nextBtn.addEventListener("click",()=>{
  if(currentSongIndex != songs.length-1){
    resetSong(currentSongIndex);
    currentSongIndex++;
    fillPlayingCardDetails();
    playSong(currentSongIndex);
    playPauseBtn.firstElementChild.setAttribute('src','./images/circle-pause-solid.svg')
  }
})


previousBtn.addEventListener("click",()=>{
  if(currentSongIndex != 0){
    resetSong(currentSongIndex);
    currentSongIndex--;
    fillPlayingCardDetails();
    playSong(currentSongIndex);
    playPauseBtn.firstElementChild.setAttribute('src','./images/circle-pause-solid.svg')
  }
})


seekBar.addEventListener("change",()=>{
  songs[currentSongIndex].song.currentTime = seekBar.value * songs[currentSongIndex].song.duration/100
})
