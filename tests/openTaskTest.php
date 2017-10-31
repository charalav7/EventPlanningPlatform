<?php
use PHPUnit\Framework\TestCase;



class openTaskTest extends TestCase
{
    public function testOpen()
    {
        $_POST['idTask'] = 1;
        $this -> expectOutputString('{"result":"success"}');
        include dirname(__FILE__).'/../app/php/openTask.php';
    }
}
?>
