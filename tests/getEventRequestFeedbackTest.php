<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getEventRequestFeedbackTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'mike';
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
    public function testgetEventRequestFeedback($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'getEventRequestFeedback.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertNotEquals(null, $obj['feedback']);
        return;

    }

    /**
    * @depends testgetEventRequestFeedback
    */
    public function testgetEventRequestFeedbackInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'getEventRequestFeedback.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals(null, $obj['feedback']);

    }


}

?>
