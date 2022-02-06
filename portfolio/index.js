// console.log("Моя оценка - 85 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1. Вёрстка соответствует макету. Ширина экрана 768px\n2.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n3.На ширине экрана 768рх и меньше реализовано адаптивное меню +22");
console.log('Моя оценка - 85 баллов\nОтзыв по пунктам ТЗ:\n Выполненные пункты: \n 1.при кликах по кнопкам Winter, Spring, Summer, Autumn в секции portfolio отображаются изображения из папки с соответствующим названием\n2.кнопка, по которой кликнули, становится активной т.е. выделяется стилем. Другие кнопки при этом будут неактивными\n 3.при клике по надписи ru англоязычная страница переводится на русский язык\n 4.при клике по надписи en русскоязычная страница переводится на английский язык\n 5.надписи en или ru, соответствующие текущему языку страницы, становятся активными т.е. выделяются стилем \n 6.тёмная тема приложения сменяется светлой \n 7.светлая тема приложения сменяется тёмной \n 8.после смены светлой и тёмной темы интерактивные элементы по-прежнему изменяют внешний вид при наведении и клике и при этом остаются видимыми на странице (нет ситуации с белым шрифтом на белом фоне) \n 9.выбранный пользователем язык отображения страницы и светлая или тёмная тема сохраняются при перезагрузке страницы \n 10.сложные эффекты для кнопок при наведении и/или клике');

import i18Obj from './js/translate.js';

const burgerBtn = document.querySelector('.burger-btn'),
      navigation = document.querySelector('.nav'),
      navList = document.querySelector('.nav-list');
const links = document.querySelectorAll('.nav-link');
const btnSeason = document.querySelectorAll('.btn-season');
const portfolioImage = document.querySelectorAll('.portfolio-image');
const seasons = ['winter', 'spring', 'summer', 'autumn'];
const languageWords = document.querySelectorAll('[data-i18]');
const languageBtns = document.querySelectorAll('.lang');
const switchBtn = document.querySelector('.switch-btn-dark');
const changeElements = document.querySelectorAll('.light');
const changeBtns = document.querySelectorAll('.light-btn');

let lang = 'en';
let theme = 'moon';

function setLocalStorage(name, val) {
    localStorage.setItem(name, val);
}

function getLocalStorage() {
    if (localStorage.getItem('lang')) {
      const lang = localStorage.getItem('lang');
      getTranslate(lang);
      changeLoadBtn(languageBtns, lang, 'active-lang-btn');
    }
    if (localStorage.getItem('theme')) {
        const theme = localStorage.getItem('theme');
        changeLoadBtnTheme(theme);
    }
}

window.addEventListener('load', getLocalStorage);

function closeMenu(e) {
    if (e.target.classList.contains('nav-link')) {
        burgerBtn.classList.remove('active');
        navigation.classList.remove('show');
    }
}
    burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('active');
    navigation.classList.toggle('show');
});

links.forEach((element) => element.addEventListener('click', closeMenu));

function changeImage(e) {
    const target = e.target;
    if (target.classList.contains('btn-season')){
        portfolioImage.forEach((img, i) => img.src = `./assets/img/${target.dataset.season}/${i + 1}.jpg`);
    }
}

function preloadSummerImages(season) {
    for(let i = 1; i <= 6; i++) {
        const img = new Image();
        img.src = `./assets/img/${season}/${i}.jpg`;
    }
}

seasons.forEach((season) => preloadSummerImages(season));

function changeActiveButton(e, btn, class1, class2) {
    const tar = e.target;
    if(tar.classList.contains(class1)) {
        btn.forEach((elem) => elem.classList.remove(class2));
        tar.classList.add(class2);
    }
}

function changeLoadBtn(btn, lang, class2) {
    if (lang == 'ru') {
        btn.forEach((elem) => elem.classList.toggle(class2));
    }
}

btnSeason.forEach((elem) => elem.addEventListener('click', (elem) => {
     changeImage(elem);
     changeActiveButton(elem, btnSeason,'btn-season', 'btn-active');
}));

function getTranslate(language) {
    languageWords.forEach((elem) => {
        const chosenLanguage = i18Obj[language];
        const chosenDataSet = elem.dataset.i18;  
        elem.textContent = chosenLanguage[chosenDataSet];
        
        if (elem.placeholder) {
            elem.placeholder = (i18Obj[language])[elem.dataset.i18];
            elem.textContent = '';
        }
    });     
}
function changeLanguages(event) {
    const target = event.target;
    if (target.classList.contains('lang')) {
        lang = target.dataset.language;
        setLocalStorage('lang', lang);
        getTranslate(lang);
    }
}

languageBtns.forEach((btn) => btn.addEventListener('click', (elem) => {
    changeLanguages(elem);
    changeActiveButton(elem, languageBtns, 'lang', 'active-lang-btn'); 
}));
function changeTheme(e) {
    if (e.target.classList.contains('switch-btn-dark') && theme === 'moon') {
        console.log('5', theme);
        switchBtn.classList.add('switch-btn');
        changeBtns.forEach((el) => el.classList.add('light-th'));
        changeElements.forEach((el) => el.classList.add('light-theme'));
        changeElements.forEach((el) => el.classList.add('div-light-theme'));
        burgerBtn.classList.add('light-navigation');
        navList.classList.add('light-navigation');
        links.forEach((el) => el.classList.add('light-navigation'));
        theme = 'sun';
        setLocalStorage('theme', theme);
    } else if (e.target.classList.contains('switch-btn-dark') && theme === 'sun') {
        switchBtn.classList.remove('switch-btn');
        changeBtns.forEach((el) => el.classList.remove('light-th'));
        changeElements.forEach((el) => el.classList.remove('light-theme'));
        changeElements.forEach((el) => el.classList.remove('div-light-theme'));
        burgerBtn.classList.remove('light-navigation');
        navList.classList.remove('light-navigation');
        links.forEach((el) => el.classList.remove('light-navigation'));
        theme = 'moon';
        setLocalStorage('theme', theme);
    }
};

switchBtn.addEventListener('click', changeTheme);

function changeLoadBtnTheme(variantTheme) {
    if (variantTheme === 'moon') {
        switchBtn.classList.remove('switch-btn');
        changeBtns.forEach((el) => el.classList.remove('light-th'));
        changeElements.forEach((el) => el.classList.remove('light-theme'));
        changeElements.forEach((el) => el.classList.remove('div-light-theme'));
        burgerBtn.classList.remove('light-navigation');
        navList.classList.remove('light-navigation');
        links.forEach((el) => el.classList.remove('light-navigation'));

    }   else if (variantTheme === 'sun') {
        switchBtn.classList.add('switch-btn');
        changeBtns.forEach((el) => el.classList.add('light-th'));
        changeElements.forEach((el) => el.classList.add('light-theme'));
        changeElements.forEach((el) => el.classList.add('div-light-theme'));
        burgerBtn.classList.add('light-navigation');
        navList.classList.add('light-navigation');
        links.forEach((el) => el.classList.add('light-navigation'));
        theme = 'sun';
    }
}
