const btnSound = document.querySelectorAll('.sound');
const background = document.querySelector('.main-container');
const audio = new Audio();
const playBtn = document.querySelector('.play-btn');
let isPlay = false;
const birds = document.querySelectorAll('.nav-link');

audio.src = '/assets/audio/forest.mp3';
let fileName = 'forest.mp3';

function playAudio() {
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        playBtn.style.backgroundImage = 'url(/assets/svg/pause.svg)';
        isPlay = true;
    } else {
        audio.pause();
        playBtn.style.backgroundImage = 'url(/assets/svg/play.svg)';
        isPlay = false;
    }
    
}
  btnSound.forEach((item) => item.addEventListener('click', (item) => {
    changeData(item);
    
    if (isPlay) {
        isPlay = false;
    } else {
        isPlay = true;
    }
    playAudio(); 
}));

playBtn.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('play-btn')){
        audio.src = '/assets/audio/forest.mp3';
        playAudio();
    } 
})

function changeActiveButton(e, btn, class1, class2) {
    const tar = e.target;
    if(tar.classList.contains(class1)) {
        btn.forEach((elem) => elem.classList.remove(class2));
        tar.classList.add(class2);
    }
}

birds.forEach((bird) => bird.addEventListener('click', (elem) => {
    changeActiveButton(elem, birds, 'nav-link', 'active-bird-btn'); 
}));

function changeData(e) {
    const target = e.target;
    if (target.classList.contains('sound')){
        background.style.backgroundImage = `url(/assets/img/${target.dataset.bird}.jpg)`;
        audio.src = `/assets/audio/${target.dataset.bird}.mp3`;
        fileName = `${target.dataset.bird}.mp3`;
        // download(audio.src, `${target.dataset.bird}.mp3`);
        console.log(audio.src, fileName);
    }
};
const anchor = document.createElement('a');
const wrapper = document.createElement('div');
    wrapper.classList.add('download');
    document.querySelector('.player').appendChild(wrapper);
    document.querySelector('.download').appendChild(anchor);
const downloadBtn = document.querySelector('.download');

function download (path, filename) {  
    anchor.href = path;
    anchor.download = filename;
    anchor.click();
    // document.querySelector('.download').removeChild(anchor);
    console.log(path, filename, anchor, downloadBtn);
}
downloadBtn.addEventListener('click', () => {
    download(audio.src, fileName);
})
// download('/assets/audio/forest.mp3', 'forest.mp3');



    




