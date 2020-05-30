<?php
include './core/class/storage.php';
include './core/class/sessionStorage.php';
include './core/class/board.php';


$storage = new SessionStorage('map');
$board = new Board($storage);

if (isset($_GET['newFigures']))
    echo $board->newFigures();

if (isset($_GET['getFigures']))
    echo $board->getFigures();

if (isset($_GET['moveFigure'])) //  метод сохранения перемещения фигур
    echo $board->moveFigure($_GET['frCoord'], $_GET['toCoord']);

