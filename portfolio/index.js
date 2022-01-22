console.log("Моя оценка - 85 баллов\nОтзыв по пунктам ТЗ:\nВыполненные пункты:\n1. Вёрстка соответствует макету. Ширина экрана 768px\n2.Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки. Весь контент страницы при этом сохраняется: не обрезается и не удаляется +15\n3.На ширине экрана 768рх и меньше реализовано адаптивное меню +22");

let burgerBtn = document.querySelector('.burger-btn'),
    navigation = document.querySelector('.nav');
const links = document.querySelectorAll('.nav-link');

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


