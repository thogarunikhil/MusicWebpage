
let songIndex = 0;
let prevIndex = 0;
let audioElement = new Audio('songs/Buttabomma_320(MyMp3Song).mp3')
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let bottomName = document.getElementById('bottomName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let playBtn = Array.from(document.getElementsByClassName('playBtn'));

let previousBtn = document.getElementById('previousBtn');
let forwardBtn = document.getElementById('forwardBtn');
let songs = [
    {songName: "Buttabomma", filePath: "songs/Buttabomma_320(MyMp3Song).mp3", coverPath: "image/ala_vaikuntapuramlo.jpeg"},
    {songName: "Samajavaragamana", filePath: "songs/Samajavaragamana - Male_320(MyMp3Song).mp3", coverPath: "image/ala_vaikuntapuramlo.jpeg"},
    {songName: "Maate Vinadhuga", filePath: "songs/Maate Vinadhuga_320(MyMp3Song).mp3", coverPath: "image/taxiwala.jpeg"},
    {songName: "Kalaavathi", filePath: "songs/Kalaavathi_320(MyMp3Song).mp3", coverPath: "image/sarkaar.jpg"},
    {songName: "Baby He Loves You", filePath: "songs/Baby He Loves You_320(MyMp3Song).mp3", coverPath: "image/aarya2.jpg"},
    {songName: "Uppenantha", filePath: "songs/Uppenantha_320(MyMp3Song).mp3", coverPath: "image/aarya2.jpg"},
]


songItems.forEach((element, i)=>{
    element.getElementsByTagName('img')[0].src = songs[i].coverPath;
    element.getElementsByClassName('songName')[0].innerText = songs[i].songName;
})

masterPlay.addEventListener('click', ()=>{
    if (audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        playBtn[songIndex].classList.remove('fa-play');
        playBtn[songIndex].classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        playBtn[songIndex].classList.remove('fa-pause');
        playBtn[songIndex].classList.add('fa-play');
        gif.style.opacity = 0;
    }
    bottomName.textContent = songs[songIndex].songName;
}) 



function stopAll(){
    playBtn[prevIndex].classList.remove('fa-pause');
    playBtn[prevIndex].classList.add('fa-play');
    audioElement.pause();
    audioElement.currentTime = 0;
    myProgressBar.value = 0;
}
playBtn.forEach((element, i)=>{
    element.addEventListener('click',()=>{
        if (element.classList.contains('fa-play')){
            if (prevIndex != -1){
                stopAll();
            }
            element.classList.remove('fa-play');
            element.classList.add('fa-pause');
            audioElement = new Audio(songs[i].filePath);
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            prevIndex = i;
            songIndex = i;
        }else{
            element.classList.remove('fa-pause');
            element.classList.add('fa-play');
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
        bottomName.textContent = songs[songIndex].songName;
        audioElement.addEventListener('timeupdate',()=>{
            let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
            myProgressBar.value = progress;
        })
        
        myProgressBar.addEventListener('change',()=>{
            audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
        })

/*         masterPlay.addEventListener('click', ()=>{
            if (audioElement.paused || audioElement.currentTime <= 0){
                audioElement.play();
                masterPlay.classList.remove('fa-play-circle');
                masterPlay.classList.add('fa-pause-circle');
                gif.style.opacity = 1;
            }
            else{
                audioElement.pause();
                masterPlay.classList.remove('fa-pause-circle');
                masterPlay.classList.add('fa-play-circle');
                gif.style.opacity = 0;
            }
        })  */
    })
})

/* audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
}) */

forwardBtn.addEventListener('click',()=>{
    stopAll();
    songIndex++;
    songIndex = songIndex%6;
    playBtn[songIndex].classList.remove('fa-play');
    playBtn[songIndex].classList.add('fa-pause');
    audioElement = new Audio(songs[songIndex].filePath);
    audioElement.play();
    prevIndex = songIndex;
    bottomName.textContent = songs[songIndex].songName;
    audioElement.addEventListener('timeupdate',()=>{
        console.log('timeupdate');
        let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value = progress;
    })
    
    myProgressBar.addEventListener('change',()=>{
        audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    })
    // As 6 is the total number of songs  here;
})

backwardBtn.addEventListener('click',()=>{
    stopAll();
    songIndex--;
    if (songIndex < 0){
        songIndex=6+songIndex;
    }
    songIndex = songIndex%6;
    playBtn[songIndex].classList.remove('fa-play');
    playBtn[songIndex].classList.add('fa-pause');
    audioElement = new Audio(songs[songIndex].filePath);
    audioElement.play();
    prevIndex = songIndex;
    bottomName.textContent = songs[songIndex].songName;
    audioElement.addEventListener('timeupdate',()=>{
        let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
        myProgressBar.value = progress;
    })
    
    myProgressBar.addEventListener('change',()=>{
        audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
    })
})

/* audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
}) */
