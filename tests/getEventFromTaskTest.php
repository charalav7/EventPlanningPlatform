<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getEventFromTaskTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'janet';
        $obj = getTaskList($username);
        $size = sizeof($obj);
        if($size > 0) {
                $this -> assertTrue(true);
                return $obj[0]['idTask'];
        }

        $this -> assertTrue(false, "No task available for .$username.");
    }

    /**
    *@depends testGetTaskList
    */
    public function testgetEventFromTask($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'getEventFromTask.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertGreaterThan(0, $size);
        return;

    }

    /**
    * @depends testgetEventFromTask
    */
    public function testgetEventFromTaskInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'getEventFromTask.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals(0, $size);

    }


}

?>
