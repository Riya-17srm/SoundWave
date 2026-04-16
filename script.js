console.log("Welcome to Spotify!");

let songIndex=0;
let audioElement= new Audio('song1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif= document.getElementById("gif");
let songItems = Array.from(document.getElementsByClassName('songItems'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));
let masterSongName= document.getElementById("masterSongName");
let songs= [
   { songName: "Aao Milo Chlo", filePath: "song1.mp3" , coverPath: "cover.jpeg"},
   { songName: "Tera Rastaa Chhodoon Na", filePath: "song2.mp3" , coverPath: "cover2.jpeg"},
   { songName: "Girl I Need You", filePath: "song3.mp3" , coverPath: "cover3.jpeg"},
   { songName: "Jao Na", filePath: "song4.mp3" , coverPath: "cover4.jpeg"},
   { songName: "Mitti Di Khushboo", filePath: "song5.mp3" , coverPath: "cover5.jpeg"},
   { songName: "Saadi Galli Aaja", filePath: "song6.mp3" , coverPath: "cover6.jpeg"} 
    
]

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("SongName")[0].innerText= songs[i].songName;
})

// songs.forEach((song, i)=>{
//     console.log(song, i);
//     let audio=new Audio(song.filePath);

//     audio.addEventListener('loadmetadata', ()=>{
//      let durationInSeconds= audio.duration;
//      let minute= Math.floor(durationInSeconds/60);
//     })
// })
masterPlay.addEventListener('click', ()=>{

    if(audioElement.paused || audioElement.currentTime<=0)
    {

        audioElement.play();
        masterSongName.innerText= songs[songIndex].songName;
        songItemPlay[songIndex].classList.remove('fa-circle-play');
        songItemPlay[songIndex].classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;

    }
    else{
        audioElement.pause();
        songItemPlay[songIndex].classList.remove('fa-circle-pause');
        songItemPlay[songIndex].classList.add('fa-circle-play');
        
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
});

const makeAllPlays= ()=>{
    songItemPlay.forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click',(e)=>{
    songIndex=parseInt(e.target.id);
    if(e.target.classList.contains('fa-circle-play'))
    {
    makeAllPlays();
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src = `song${songIndex + 1}.mp3`;
      audioElement.currentTime=0;
      audioElement.play();
      masterSongName.innerText= songs[songIndex].songName;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      gif.style.opacity=1;
    }
    else if(e.target.classList.contains('fa-circle-pause'))
    {
    e.target.classList.remove('fa-circle-pause');
    e.target.classList.add('fa-circle-play');
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause');
      masterPlay.classList.add('fa-circle-play');
      gif.style.opacity=0;
    }
 })
})

document.getElementById('next').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
      audioElement.src = `song${songIndex + 1}.mp3`;
      audioElement.currentTime=0;
      audioElement.play();
       masterSongName.innerText= songs[songIndex].songName;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      songItemPlay[songIndex].classList.remove('fa-circle-play');
      songItemPlay[songIndex].classList.add('fa-circle-pause');
      gif.style.opacity=1;
})
document.getElementById('previous').addEventListener('click', ()=>{
    makeAllPlays();
    if(songIndex<=0){
        songIndex=5;
    }
    else{
        songIndex-=1;
    }
      audioElement.src = `song${songIndex + 1}.mp3`;
      audioElement.currentTime=0;
      audioElement.play();
      masterSongName.innerText= songs[songIndex].songName;
      masterPlay.classList.remove('fa-circle-play');
      masterPlay.classList.add('fa-circle-pause');
      songItemPlay[songIndex].classList.remove('fa-circle-play');
      songItemPlay[songIndex].classList.add('fa-circle-pause');
})


audioElement.addEventListener('timeupdate', ()=>{
   progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
   myProgressBar.value= progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime= (myProgressBar.value*audioElement.duration)/100;
})