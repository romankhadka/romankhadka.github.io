$(document).ready(() => {
    var puzzlePieces = $$("#puzzlearea div");
    var puzzleArea = $('#puzzlearea');
    var divs = $(puzzleArea).find("div");
    $('#puzzlearea').append($('<div id="emptySpace"></div>'));
    $('#emptySpace').css({
        'left': '300px',
        'top': '300px',
        'position': 'absolute',
        'width': '90px',
        'height': '90px',
        'border': '5px solid black'
    });

    // initialize each piece
    for (var i = 0; i < divs.length; i++) {
        var div = divs[i];

        // calculate x and y for this piece
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
        let emptySpace = $('#emptySpace')[0];
        let top = parseInt(piece.style.top);
        let left = parseInt(piece.style.left);
        let emptyTop = parseInt(emptySpace.style.top);
        let emptyLeft = parseInt(emptySpace.style.left);


        if (top === emptyTop && (left - 100 === emptyLeft || left + 100 === emptyLeft)) {
            emptySpace.style.top = `${top}px`;
            emptySpace.style.left = `${left}px`;
            piece.style.top = `${emptyTop}px`;
            piece.style.left = `${emptyLeft}px`;
        } else if (left === emptyLeft && (top - 100 === emptyTop || top + 100 === emptyTop)) {
            emptySpace.style.top = `${top}px`;
            emptySpace.style.left = `${left}px`;
            piece.style.top = `${emptyTop}px`;
            piece.style.left = `${emptyLeft}px`;
        }

        checkIfGameWon();
    }

    function checkIfGameWon() {
        let currentPos = 1;
        let gameWon = true;
        $("#puzzlearea div").each((_ind, piece) => {
            if($(div).attr('id')!='emptySpace' && _ind!=15) {
                console.log('######################');
                console.log(piece);
                console.log(!!currentPos);
                console.log(!piece.dataset.position);
                console.log(!!currentPos && !piece.dataset.position);
                console.log(piece.dataset.position != currentPos);
                console.log(currentPos);
                console.log(_ind);
                console.log('######################');

                if ((!!currentPos && !piece.dataset.position) || piece.dataset.position != currentPos) {
                    gameWon = false;
                }
                currentPos++;
            } else if($(div).attr('id') == 'emptySpace' && _ind<15) {
                gameWon=false;
            }
        });
        if (gameWon) {
            // alert("You won!");
        }
    }

});