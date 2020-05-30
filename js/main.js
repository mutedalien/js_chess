let map;        //  переменная массива карты
let divSquare = '<div id="s$coord" class="square $color"></div>';   //  квадрат с координатами и цветом (s - Square)
let divFigure = '<div id="f$coord" class="figure">$figure</div>';   //  фигура с координатами и цветом (f - Figure)

$(function () {
    start();
});

function start() {          //  помещаем в эту функцию все, что следует исполнить в начале
    map = new Array(64);    //  создаем массив карты
    addSquares();           //  вызываем функцию создания квадрата
    showFigures('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');    //  расставляем фигуры
}

function setDraggable() {       //  функция переноса фигуры
    $('.figure').draggable();   //  делаем фигуры перетаскиваемыми
}

function setDroppable() {       //  функция приземления фигуры (обновление координат при приземлении)
    $('.square').droppable({
        drop:   function (event, ui) {              //  при приземлении...
                    var frCoord = ui.draggable.attr('id').substring(1);      //  переменная взлета
                    var toCoord = this.id.substring(1);                      //  переменная приземления
                    moveFigure(frCoord, toCoord);   //  запускаем функцию перемещения фигуры
        }
    });
}

function moveFigure(frCoord, toCoord) {         //  функция перемещения фигуры
    console.log('move from ' + frCoord + ' to ' + toCoord);   //  тестируем
    figure = map[frCoord];
    showFigureAt(frCoord, '1');
    showFigureAt(toCoord, figure);
    setDraggable();             //  делаем фигуру вновь подвижной
}

function addSquares() {         //  функция создания квадрата
    $('.board').html('');
    for (var coord = 0; coord < 64; coord++)    //  цикл для перебора 64 координаты
        $('.board').append(divSquare
            .replace('$coord', coord)           //  coord выводит id клетки в инспекторе
            .replace('$color',
                isBlackSquareAt(coord) ? 'black' : 'white'));
    setDroppable();             //  вызываем функцию завершения хода
}

function showFigures(figures) {    //  функция, расставляющая фигуры на доске
    for (var coord = 0; coord < 64; coord++)            //  цикл для перебора 64 координаты
        showFigureAt(coord, figures.charAt(coord));     //  и для каждой координаты ставим нужную фигуру
}

function showFigureAt(coord, figure) {  //  функция вывода фигуры
    map[coord] = figure;                //  запоминаем фигуру, которой ходим
    $('#s' + coord).html(divFigure      //  обращаемся к квадрату, в котор находимся и устанавл в нем html c divFigure
        .replace('$coord', coord)       //  реплейсим координату
        .replace('$figure', getChessSymbol(figure)));   //  вставляем фигуру
    setDraggable();                     //  вызываем функцию начала хода
}

function getChessSymbol(figure) {       //  функция, назначающая символы для фигур
    switch (figure) {
        case 'K' : return '&#9812;';    //  король
        case 'Q' : return '&#9813;';    //  ферзь
        case 'R' : return '&#9814;';    //  ладья
        case 'B' : return '&#9815;';    //  слон
        case 'N' : return '&#9816;';    //  конь
        case 'P' : return '&#9817;';    //  пешка
        case 'k' : return '&#9818;';
        case 'q' : return '&#9819;';
        case 'r' : return '&#9820;';
        case 'b' : return '&#9821;';
        case 'n' : return '&#9822;';
        case 'p' : return '&#9823;';
        default : return '';            //  чистим
    }
}

function isBlackSquareAt(coord) {                       //  функция "закраски" четных квадратов
    return (coord % 8 + Math.floor(coord / 8)) % 2;     //  четные true, нечетные false
}