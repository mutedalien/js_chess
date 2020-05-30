let map;                //  переменная массива карты
let divSquare = '<div id="s$coord" class="square $color"></div>';   //  квадрат с координатами и цветом (s - Square)
let divFigure = '<div id="f$coord" class="figure">$figure</div>';   //  фигура с координатами и цветом (f - Figure)
let isDragging = false; //  переменная, объявляющая начало переноса фигуры
let isFlipped = false;  //  переменная, объявляющая переворот доски

$(function () {
    start();
    $('.buttonNew').click(newFiguresPHP);   //  действие при нажатии кнопки New (обнуление партии)
    $('.buttonFlip').click(flipBoard);      //  действие при нажатии кнопки Flip (переворот доски)
    setInterval('showFiguresPHP()', 3000);  //  задаем интервал вызова положения фигур на доске (2 сек)
});

function start() {          //  помещаем в эту функцию все, что следует исполнить в начале
    map = new Array(64);    //  создаем массив карты
    addSquares();           //  вызываем функцию создания квадрата
    showFiguresPHP();       //  расставляем фигуры
}

function flipBoard() {
    isFlipped = !isFlipped;
    start();
}

function setDraggable() {               //  функция переноса фигуры
    $('.figure').draggable({            //  делаем фигуры перетаскиваемыми
        start:  function (event, ui) {  //  метод ожидания завершения хода
                    isDragging = true;  //  переменная, объявляющая начало переноса фигуры
        }
    });
}

function setDroppable() {       //  функция приземления фигуры (обновление координат при приземлении)
    $('.square').droppable({
        drop:   function (event, ui) {                  //  при приземлении...
                    var frCoord = ui.draggable.attr('id').substring(1);      //  переменная взлета
                    var toCoord = this.id.substring(1);                      //  переменная приземления
                    moveFigure(frCoord, toCoord);       //  запускаем функцию перемещения фигуры
                    moveFigurePHP(frCoord, toCoord);    //  вызываем метод перемещения фигуры на php-сервере
                    isDragging = false;                 //  переменная, объявляющая завершение переноса фигуры
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
            .replace('$coord', isFlipped ? 63 - coord : coord)  //  coord выводит id клетки в инспекторе
            .replace('$color',
                isBlackSquareAt(coord) ? 'black' : 'white'));
    setDroppable();             //  вызываем функцию завершения хода
}

function showFigures(figures) {    //  функция, расставляющая фигуры на доске
    for (var coord = 0; coord < 64; coord++)            //  цикл для перебора 64 координаты
        showFigureAt(coord, figures.charAt(coord));     //  и для каждой координаты ставим нужную фигуру
}

function showFigureAt(coord, figure) {  //  функция вывода фигуры
    if (map[coord] == figure) return;   //  если в этих координатах эта фигура уже стоит, то отбой
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

function newFiguresPHP() {      //  функция обнуления партии
    $.get('chess.php?newFigures',
        showFigures);
}

function moveFigurePHP(frCoord, toCoord) {  //  вызываем метод перемещения фигуры на php-сервере
    $.get('chess.php?moveFigure' +          //  вызываем скрипт с методом
            '&frCoord=' + frCoord +         //  передаем ему два параметра
            '&toCoord=' + toCoord,
        showFigures);
}

function showFiguresPHP() {             //  функция расстановки фигур
    if (isDragging) return;             //  если фигура поднята, то отбой
    $.get('chess.php?getFigures',
        showFigures);
}