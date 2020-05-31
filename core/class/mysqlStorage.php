<?php


class MysqlStorage implements Storage
{
    var $pdo;

    function __construct($dns, $user, $pass)
    {
        $this->pdo = new PDO($dns, $user, $pass);
    }

    function save($figures)
    {
        $this->pdo
            ->prepare('UPDATE Board SET figures = ?')
            ->execute(array($figures));
        return $this->load();
    }

    function load()
    {
        return $this->pdo
            ->query("SELECT figures FROM Board")
            ->fetch()[0];
    }
}