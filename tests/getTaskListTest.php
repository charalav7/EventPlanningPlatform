<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getTaskTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'janet';
        $obj = getTaskList($username);
        $size = sizeof($obj);
        $this -> assertGreaterThan(0, $size);
    }

    /**
    * @depends testGetTaskList
    */
    public function testgetTaskInvalidUser() {
        $username = 'no user';
        $obj = getTaskList($username);
        $size = sizeof($obj);
        $this -> assertEquals(0, $size);
    }
}

?>
