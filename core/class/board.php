<?php

class Board
{
    var $storage;

    function __construct(Storage $storage)
    {
        $this->storage = $storage;
    }

    function newFigures()
    {
        $this->storage->save('rnbqkbnrpppppppp11111111111111111111111111111111PPPPPPPPRNBQKBNR');
        return $this->storage->load();
    }

    function getFigures()
    {
        return $this->storage->load();
    }

    function moveFigure($frCoord, $toCoord)
    {
        $figures = $this->storage->load();
        $frFigure = $figures[$frCoord];
        $toFigure = $figures[$toCoord];
        if (!$this->canMove($frFigure, $toFigure)) return $figures;
        $figures[$frCoord] = '1';
        $figures[$toCoord] = $frFigure;
        $this->storage->save($figures);
        return $this->storage->load();
    }

    function canMove($frFigure, $toFigure)                  //  функция проверки корректности хода
    {
        if (strpos('Kk', $toFigure) !== false) return false; //  королей есть нельзя
        $frColor = $this->getFigureColor($frFigure);
        $toColor = $this->getFigureColor($toFigure);
        return $frColor != $toColor;                        //  свои фигуры есть нельзя
    }

    function getFigureColor($figure)                        //  функция проверки цвета фигуры
    {
        if (strpos('RNBQKP', $figure) !== false) return 'white';
        if (strpos('rnbqkp', $figure) !== false) return 'black';
        return 'empty';
    }
}