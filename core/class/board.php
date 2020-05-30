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
        $figure = $figures[$frCoord];
        $figures[$frCoord] = '1';
        $figures[$toCoord] = $figure;
        $this->storage->save($figures);
        return $this->storage->load();
    }
}