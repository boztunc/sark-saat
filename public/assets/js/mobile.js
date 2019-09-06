var urlString = window.location.href;
var url = new URL(urlString);
var screenId = url.searchParams.get("screenId");
var screenName = "";

//GET SCREEN NAME FROM URL
if (screenId == 2) { //AKMERKEZ
    screenName = "Akmerkez";
    ga('send', 'event', 'Şark Saat / Ekran', 'Akmerkez');
    $('#SkeletonX').on('click', function () {
        window.open('https://hubs.ly/H0jsrTK0');
    });
    $('#FreakX').on('click', function () {
        window.open('https://hubs.ly/H0jsrz80');
    });
    $('#NewDiver').on('click', function () {
        window.open('https://hubs.ly/H0jsrzy0');
    });
}
else if (screenId == 188) { //NİŞANTAŞI
    screenName = "Nişantaşı-Abdi-İpekçi";
    ga('send', 'event', 'Şark Saat / Ekran', 'Nişantaşı-Abdi-İpekçi');
    $('#SkeletonX').on('click', function () {
        window.open('https://hubs.ly/H0jss1_0');
    });
    $('#FreakX').on('click', function () {
        window.open('https://hubs.ly/H0jsrPg0');
    });
    $('#NewDiver').on('click', function () {
        window.open('https://hubs.ly/H0jsrPL0');
    });
}
else if (screenId == 231) { //BODRUM PALMARINE
    screenName = "Bodrum-Palmire";
    ga('send', 'event', 'Şark Saat / Ekran', 'Bodrum-Palmire');
    $('#SkeletonX').on('click', function () {
        window.open('https://hubs.ly/H0jsts10');
    });
    $('#FreakX').on('click', function () {
        window.open('https://hubs.ly/H0jsvhF0');
    });
    $('#NewDiver').on('click', function () {
        window.open('https://hubs.ly/H0jstst0');
    });
}
else if (screenId == 253) { //TURGUT REIS
    screenName = "TurgutReis-DMarin";
    ga('send', 'event', 'Şark Saat / Ekran', 'TurgutReis-DMarin');
    $('#SkeletonX').on('click', function () {
        window.open('https://hubs.ly/H0jstwg0');
    });
    $('#FreakX').on('click', function () {
        window.open('https://hubs.ly/H0jstvN0');
    });
    $('#NewDiver').on('click', function () {
        window.open('https://hubs.ly/H0jsvnX0');
    });
}

//ANIMATE IMAGES
$(function () {
    $('body').css('width', window.screen.width);
    var i = 0;

    $('.next').on("click", function () {

        i = i + 1;

        if (i == $('.watch').length) {
            i = 0;
        }

        var currentImg = $('.watch').eq(i);
        var prevImg = $('.watch').eq(i - 1);

        ga('send', 'event', 'Şark Saat / Ekran', screenName, currentImg.prop('id'));
        animateImage(prevImg, currentImg);
    });

    $('.previous').on("click", function () {

        if (i == 0) {
            prevImg = $('.watch').eq(0);
            i = $('.watch').length - 1;
            currentImg = $('.watch').eq(i);
        }

        else {
            i = i - 1;

            currentImg = $('.watch').eq(i);
            prevImg = $('.watch').eq(i + 1);
        }

        ga('send', 'event', 'Şark Saat / Ekran', screenName, currentImg.prop('id'));
        animateImageLeft(prevImg, currentImg);
    });

    function animateImageLeft(prevImg, currentImg) {

        currentImg.css({ "left": "100%" });
        currentImg.animate({ "left": "0%" }, 1000);
        currentImg.css('left', '0').css('right', '0');

        prevImg.animate({ "left": "-100%" }, 1000, function () { prevImg.css("right", ""); });
    }

    function animateImage(prevImg, currentImg) {

        currentImg.css({ "left": "-100%" });
        currentImg.animate({ "left": "0%" }, 1000);
        currentImg.css('left', '0').css('right', '0');

        prevImg.animate({ "left": "100%" }, 1000, function () { prevImg.css("right", "").css('left', '-100%'); });
    }
});



/** SOCKET **/

var socket = io.connect("http://sarksaat.themediamove.com/");

socket.emit("roomMove", { screen: screenId });

$('.next').on('click', function () {
    socket.emit('sarkSaat', { data: "next" });
});

$('.previous').on('click', function () {
    socket.emit('sarkSaat', { data: "prev" });
});


