$(document).ready(() => {
    var puzzlePieces = $$("#puzzlearea div");
    var puzzleArea = $('#puzzlearea');
    var divs = $(puzzleArea).find("div");
    $('#puzzlearea').append($('<div id="emptySpace" data-position="16"></div>'));
    $('#emptySpace').css({
        'left': '300px',
        'top': '300px',
        'position': 'absolute',
        'width': '90px',
        'height': '90px',
        'border': '5px solid black'
    });

    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];

        var x = ((i % 4) * 100);
        var y = (Math.floor(i / 4) * 100);

        // set basic style and background
        $(div).addClass("puzzlepiece");
        $(div).addClass("puzzlepiece-" + (i + 1));
        $(div).css({
            "left": x + "px",
            "top": y + "px",
            "backgroundImage": 'url("images/fifteen-background.jpg")',
            "backgroundPosition": -x + 'px ' + (-y) + 'px'
        });

        $(div).attr('x', x);
        $(div).attr('y', y);
        div.dataset.position = i + 1;
        $(div).on('click', (e) => movePiece(e.target));
    }

    $("#shufflebutton").on("click", shufflePieces);

    function shufflePieces() {
        puzzlePieces.forEach(function (ele, _ind) {
            let randomBlockPos = Math.floor(Math.random() * 15);
            let randomBlock = document.querySelector(`.puzzlepiece[data-position='${randomBlockPos}']`);
            let randomBlockX = $(randomBlock).attr('x');
            let randomBlockY = $(randomBlock).attr('y');
            let randomBlockPosition = $(randomBlock).data('position');

            let eleX = $(ele).attr('x');
            let eleY = $(ele).attr('y');
            let elePosition = $(ele).data('position');

            $(ele).css({
                "left": randomBlockX + "px",
                "top": randomBlockY + "px",
            })
            $(ele).attr('x', randomBlockX);
            $(ele).attr('y', randomBlockY);
            $(ele).data('position', randomBlockPosition);

            $(randomBlock).css({
                "left": eleX + "px",
                "top": eleY + "px",
            })
            $(randomBlock).attr('x', eleX);
            $(randomBlock).attr('y', eleY);
            $(randomBlock).data('position', elePosition);
        });
    }

    function movePiece(piece) {
        let top = parseInt(piece.style.top);
        let left = parseInt(piece.style.left);
        let pos = piece.dataset.position;

        let emptySpace = $('#emptySpace')[0];
        let emptyTop = parseInt(emptySpace.style.top);
        let emptyLeft = parseInt(emptySpace.style.left);
        let emptyPos = emptySpace.dataset.position;

        if ((top === emptyTop && (left - 100 === emptyLeft || left + 100 === emptyLeft)) || (left === emptyLeft && (top - 100 === emptyTop || top + 100 === emptyTop))) {
            emptySpace.style.top = `${top}px`;
            emptySpace.style.left = `${left}px`;
            emptySpace.dataset.position = pos;
            piece.style.top = `${emptyTop}px`;
            piece.style.left = `${emptyLeft}px`;
            piece.dataset.position = emptyPos;
        }

        checkIfGameWon();
    }

    function checkIfGameWon() {
        let currentPos = 1;
        let gameWon = true;

        $('#puzzlearea div').each((ind, piece) => {
            if ((($(piece).attr('id') == 'emptySpace') && (ind != 15)) || (($(piece).attr('id') != 'emptySpace') && piece.dataset.position != currentPos)) {
                gameWon = false;
            }
            currentPos++;
        });

        if (gameWon) {
            setTimeout(() => alert('You won!'), 200);
        }
    }

});