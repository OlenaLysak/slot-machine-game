const IMAGE_SIZE = 150;
const REEL_LENGTH = 3;
const REEL_NUMBER = 5;
const SPIN_TIME = 5000;
const SPIN_DELAY = 500;
$(document).ready(onReady);

var imgs = [
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
];

function onReady() {
    var canvas = $('#canvas').get(0);
    $('#startGame').click(() => {
            startNewGame();
        }
    );
    var ctx;
    if (canvas.getContext) {
        ctx = canvas.getContext('2d');
    }

    function startNewGame() {
        const getRandomReel = () =>
            imgs.slice().sort(() => 0.5 - Math.random());

        const reels = Array(REEL_NUMBER).fill(0).map(getRandomReel);
        const intervals = reels.map((item, i) => {
            return setInterval(() => {
                    item.push(item.shift());
                    requestAnimationFrame(()=>drawGame(reels));
                },
                100)
        });
        intervals.forEach((item, index, array) => {
            setTimeout(() => {
                    clearInterval(item);
                    if (index === array.length - 1) {

                    }
                }
                , SPIN_TIME + SPIN_DELAY * index
            )
        });
        requestAnimationFrame(()=>drawGame(reels));
    }

    function drawGame(reels) {
       // ctx.clearRect(0, 0, canvas.width, canvas.height);
        reels.forEach((item,i)=>drawReel(item, IMAGE_SIZE * i, 0))
    }

    function drawReel(reel, x, y) {
        Array(REEL_LENGTH).fill(0).forEach((value, index) =>
            drawImage(reel[index], x, y + IMAGE_SIZE * index));
    }

    function drawImage(imgSource, x, y) {
        if (canvas.getContext) {
            //ctx.clearRect(x, y, IMAGE_SIZE, IMAGE_SIZE);
            var img = new Image();
            img.src = imgSource;
            img.onload = function () {
                ctx.clearRect(x, y, IMAGE_SIZE, IMAGE_SIZE);
                ctx.drawImage(img, x, y, 150, 150);
            };
        }
    }
}

function checkBonus(reels) {

}