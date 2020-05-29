let divSquare = '<div id="s$coord" class="square $color"></div>';
let divFigure = '<div id="f$coord" class="figure">$figure</div>';
$(function () {
    addSquares()
    showFigureAt(0, 'r');
    showFigureAt(63, 'R');
});

function addSquares() {
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++)
        $('.board').append(divSquare.replace('$coord', coord).replace('$color', isBlackSquareAt(coord) ? 'black' : 'white'));
}

function showFigureAt(coord, figure) {
    $('#s' + coord).html(divFigure.replace('$coord', coord).replace('$figure', figure));
}

function isBlackSquareAt(coord) {
    return (coord % 8 + Math.floor(coord / 8)) % 2;
}