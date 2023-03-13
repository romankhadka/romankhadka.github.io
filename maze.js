$(document).ready(() => {
    let started = false, wallsTouched = false, gameOn = false;

    function resetGame() {
        $('.boundary').removeClass('youlose');
        $('.boundary').removeClass('youwin');
        wallsTouched = false;
        started = false;
        gameOn = true;
        setStat("Not started");
    }

    function setStat(stat) {
        $('#stat').html(stat);
    }

    function gameLost() {
        if (started) {
            gameOn = false;
            started = false;
            setStat("You Lost!");
            $('.boundary').addClass('youlose');
        }
    }

    $('#start').mouseleave(function () {
        if (gameOn) {
            started = true;
        }
    });

    $('#end').mouseenter(function () {
        if (!gameOn || !started) return;
        if (started) {
            setStat("You Won!");
            $('.boundary').addClass('youwin');
        }
        gameOn = false;
        started = false;
    });

    $('.boundary').mouseenter(function () {
        gameLost();
    });

    $('#maze').mouseleave(function () {
        started = false;
    });

    $(document).on('keypress', function (e) {
        if (e.key === 's') {
            resetGame();
            setStat("Game Started!");
        }
    });

    $('#start').click(function () {
        resetGame();
        setStat("Game on...");
    });

});