$(function () {
    var i = 0;

    $('.next').on("click", function () {

        i = i + 1;

        if (i == $('img').length) {
            i = 0;
        }

        var currentImg = $('img').eq(i);
        var prevImg = $('img').eq(i - 1);

        animateImage(prevImg, currentImg);
    });

    $('.previous').on("click", function () {

        if (i == 0) {
            prevImg = $('img').eq(0);
            i = $('img').length - 1;
            currentImg = $('img').eq(i);
        }

        else {
            i = i - 1;

            currentImg = $('img').eq(i);
            prevImg = $('img').eq(i + 1);
        }

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
        
        prevImg.animate({ "left": "100%" }, 1000, function () { prevImg.css("right", ""); });

    }
});
