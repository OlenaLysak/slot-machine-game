const IMAGE_SIZE = 100;
const REEL_LENGTH = 3;
const REEL_NUMBER = 5;
const SPIN_TIME = 2000;
const SPIN_DELAY = 300;
$(document).ready(onReady);

const imgs = [
    'img/highwin_bell.png',
    'img/highwin_cherry.png',
    'img/highwin_diamond.png',
    'img/highwin_lemon.png',
    'img/highwin_seven.png',
    'img/lowwin_club.png',
    'img/lowwin_diamond.png',
    'img/lowwin_heart.png',
    'img/lowwin_spade.png',
    'img/lowwin_star.png',
    'img/wild.png'
].map( src => {
    const img = new Image();
    img.src = src;
    return img;
});
let ctx;

function onReady() {
    const canvas = $('#canvas').get(0);
    $('#startGame').click(startNewGame);
    if ( canvas && canvas.getContext) {
        ctx = canvas.getContext('2d');
    }
}
function startNewGame() {
    const reels = Array(REEL_NUMBER).fill(0).map(getRandomReel);
    const intervals = reels.map(item => setInterval(() => { //run slots
                item.push(item.shift());
                requestAnimationFrame(() => drawGame(reels));
            }, 100));
    intervals.forEach((item, index, array) => { //stop slots one by one
        setTimeout(() => {
                clearInterval(item);
                if (index === array.length - 1) {
                    checkBonus(reels)
                }
            }
            , SPIN_TIME + SPIN_DELAY * index
        )
    });
}

function drawGame(reels) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    reels.forEach((item, i) => drawReel(item, IMAGE_SIZE * i, 0));
    function drawReel(reel, x, y) {
        Array(REEL_LENGTH).fill(0).forEach((value, index) =>
            drawImage(reel[index], x, y + IMAGE_SIZE * index));
    }
    function drawImage(img, x, y) {
        ctx.drawImage(img, x, y, IMAGE_SIZE, IMAGE_SIZE);
    }
}

const getRandomReel = () => imgs.slice().sort(() => 0.5 - Math.random());

function countPoints(reels) {
    const middleRow = reels.map((item) => item[1]);
    const itemNum = middleRow.map(item => middleRow.filter(item1 => item1 === item).length);
    return Math.max(...itemNum)
}

function checkBonus(reels) {
    const points = countPoints(reels);
    if (points === 5) {
        alert('Exellent!')
    } else if (points === 4) {
        alert('Great!')
    } else if (points === 2) {
        alert('Good!')
    } else alert('You loose!')
}