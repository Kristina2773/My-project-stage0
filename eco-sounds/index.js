const btnSound = document.querySelectorAll('.sound');
const background = document.querySelector('.main-container');
const audio = new Audio();
const playBtn = document.querySelector('.play-btn');
let isPlay = false;
const birds = document.querySelectorAll('.nav-link');

function changeData(e) {
    const target = e.target;
    if (target.classList.contains('sound')){
        background.style.backgroundImage = `url(/assets/img/${target.dataset.bird}.jpg)`;
        audio.src = `/assets/audio/${target.dataset.bird}.mp3`;
    }
};

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



function download (path, filename) {
    const anchor = document.createElement('a');
    const wrapper = document.createElement('div');
    wrapper.classList.add('download');
    document.querySelector('.player').appendChild(wrapper);
    document.querySelector('.download').appendChild(anchor);
    
    anchor.href = path;
    anchor.download = filename;

    // anchor.click();
    const downloadBtn = document.querySelector('.download');
    downloadBtn.addEventListener('click', () => {
        anchor.click();
    })
    document.querySelector('.download').removeChild(anchor);
}

download('/assets/audio/forest.mp3', 'forest.mp3');

