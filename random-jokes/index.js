console.log('Моя оценка - 70 баллов\nОтзыв по пунктам ТЗ:\n Выполненные пункты: \n1.на странице есть цитата и кнопка для смены цитаты\n2.в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс\n3.При загрузке страницы приложения отображается рандомная цитата\n4.При перезагрузке страницы цитата обновляется (заменяется на другую)\n5.Есть кнопка, при клике по которой цитата обновляется (заменяется на другую)\n6.Смена цитаты сопровождается любым другим эффектом, например, изменяется изображение или меняется фоновый цвет страницы, или проигрывается звук и т.д\n7.Можно выбрать один из двух языков отображения цитат: en/ru или en/be\n8.Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения');
const url = 'https://type.fit/api/quotes';
const textQuote = document.querySelector('.quote');
const authorQuote = document.querySelector('.author-quote');
const QuoteButton = document.querySelector('.quote-button');
const audio = new Audio();
let isPlay = false;
const signVolume = document.querySelector('.sign-volume');
const languageBtns = document.querySelectorAll('.lang');
const en = document.querySelector('.btn-en');
const ru = document.querySelector('.btn-ru');
let lang = 'EN';
let arr;
async function getData() {
    const quotesList = 'index1.json';
    const res = await fetch(quotesList);
    const data = await res.json();
    arr = data;
    showData(data);
  }

getData();



function showData(data) {
    const quote = Math.round(Math.random() * data.length);
    if (quote != data.length) {
        changeWords(data, quote);
        languageBtns.forEach((btn) => btn.addEventListener('click', (elem) => {
                switchLng(elem);
                changeActiveButton(elem, languageBtns, 'lang', 'active-lang-btn');
                changeWords(data, quote);
            }));
       
    } else {
        quote = 0;
        changeWords(data, quote);
        languageBtns.forEach((btn) => btn.addEventListener('click', (elem) => {
            switchLng(elem);
            changeActiveButton(elem, languageBtns, 'lang', 'active-lang-btn');
            changeWords(data, quote);
        }));
    
    }
    
}

function changeWords (data, quote) {
    if (lang == 'EN') {
        textQuote.textContent = `${data[quote].text}`;
        authorQuote.textContent = `${data[quote].author}`;
        // console.log(quote)
        // console.log(`${data[quote].text}`)
    } else if (lang == 'RU'){
        textQuote.textContent = `${data[quote].textRU}`;
        authorQuote.textContent = `${data[quote].authorRU}`;
        // console.log(quote);
        // console.log(`${data[quote].textRU}`)
        }
}

function changeActiveButton(e, btn, class1, class2) {
    const tar = e.target;
    if(tar.classList.contains(class1)) {
        btn.forEach((elem) => elem.classList.remove(class2));
        tar.classList.add(class2);
    }
}

function switchLng (e) {
    const target = e.target;
    if (target.classList.contains('lang')) {
        lang = target.dataset.language;
    }
}

function playAudio() {
    if (!isPlay) {
        audio.currentTime = 0;
        audio.play();
        isPlay = true;
        
    } else {
        audio.pause();
        isPlay = false;
    }
    
}

QuoteButton.addEventListener('click', () => {
    getData();
    audio.src = './assets/audio/magic.mp3';
    playAudio();
})

signVolume.addEventListener('click', () => {
    if (audio.volume != 0) {
        signVolume.style.backgroundImage = 'url(assets/svg/no-sound1.svg)';
        audio.volume = 0;
    } else {
        audio.volume = 1;
        signVolume.style.backgroundImage = 'url(assets/svg/with-sound.svg)';
    }

})