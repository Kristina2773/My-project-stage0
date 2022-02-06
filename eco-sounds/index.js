console.log('Моя оценка - 70 баллов\nОтзыв по пунктам ТЗ:\n Выполненные пункты: \n1.есть не меньше пяти интерактивных элементов, с которыми пользователи могут взаимодействовать. Изменение внешнего вида самого элемента и состояния курсора при наведении, плавные анимации\n2.в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс\n3.При кликах по интерактивным элементам меняется изображение\n4.При кликах по интерактивным элементам меняется звук\n5.Активный в данный момент интерактивный элемент выделяется стилем\n6.есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание звука\n7.внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент звук\n8.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения');

const btnSound = document.querySelectorAll('.sound');
const background = document.querySelector('.main-container');
const audio = new Audio();
const playBtn = document.querySelector('.play-btn');
const sounds = document.querySelectorAll('.nav-link');
const volume = document.querySelector('.volume');
const signVolume = document.querySelector('.sign-volume');
const anchor = document.querySelector('.a');
const downloadBtn = document.querySelector('.download');
const noActive = document.querySelector('.no-active');

audio.src = './assets/audio/forest.mp3';
let fileName = 'forest.mp3';
let isPlay = false;

function playAudio() {
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        playBtn.style.backgroundImage = 'url(./assets/svg/pause.svg)';
        isPlay = true;
    } else {
        audio.pause();
        playBtn.style.backgroundImage = 'url(./assets/svg/play.svg)';
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
        playAudio();
    } 
})

function changeActiveButton(e, btn, class1, class2) {
    const tar = e.target;
    if (tar.classList.contains(class1)) {
        btn.forEach((elem) => elem.classList.remove(class2));
        tar.classList.add(class2);
    }
}

sounds.forEach((sound) => sound.addEventListener('click', (elem) => {
    changeActiveButton(elem, sounds, 'nav-link', 'active-sound-btn'); 
}));

noActive.addEventListener('click', () => {
    sounds.forEach((elem) => elem.classList.remove('active-sound-btn'));
})

function changeData(e) {
    const target = e.target;
    if (target.classList.contains('sound')){
        background.style.backgroundImage = `url(./assets/img/${target.dataset.sound}.jpg)`;
        if (target.dataset.sound == 'winter') {
            signVolume.classList.add('black-sign');
        } else {
            signVolume.classList.remove('black-sign');
        }
        audio.src = `./assets/audio/${target.dataset.sound}.mp3`;
        fileName = `${target.dataset.sound}.mp3`;
    }
};

function download (path, filename) {  
    anchor.href = path;
    anchor.download = filename;
    anchor.click();

}
downloadBtn.addEventListener('click', () => {
    download(audio.src, fileName);
})

volume.addEventListener('change', () => {
    audio.volume = volume.value;
    if (volume.value == 0) {
        signVolume.style.backgroundImage = 'url(assets/svg/no-sound1.svg)';
    } else {
        signVolume.style.backgroundImage = 'url(assets/svg/with-sound.svg)';
    }
})

signVolume.addEventListener('click', () => {
    volume.classList.toggle('active');
})






    




