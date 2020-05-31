<?php

include './core/class/storage.php';
include './core/class/sessionStorage.php';
include './core/class/fileStorage.php';
include './core/class/mysqlStorage.php';
include './core/class/board.php';

//  $storage = new SessionStorage('map');      //   метод для хранения в сессии
//  $storage = new FileStorage('figures.txt'); //   метод для хранения в файле
$storage = new MysqlStorage('mysql:host=localhost;dbname=CHESS;charset=utf8', 'root', '');
$board = new Board($storage);

if (isset($_GET['newFigures']))
    echo $board->newFigures();

if (isset($_GET['getFigures']))
    echo $board->getFigures();

if (isset($_GET['moveFigure'])) //  метод сохранения перемещения фигур
    echo $board->moveFigure($_GET['frCoord'], $_GET['toCoord']);

