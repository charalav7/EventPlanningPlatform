<?php
use PHPUnit\Framework\TestCase;

include 'taskListWrapper.php';
require_once 'wrapper.php';

class createSummaryTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'janet';
        $statusId = 4;
        $obj = getTaskList($username);
        $size = sizeof($obj);
        for ($i = 0; $i <$size; $i++) {
            if($obj[$i]['status'] == $statusId) {
                $this -> assertTrue(true);
                return $obj[$i]['idTask'];
            }
        }
        $this -> assertTrue(false, "No task which could be decided upon.");
    }

    /**
    *@depends testGetTaskList
    */
    public function testCreateSummary($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'createSummary.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testCreateSummary
    */
    public function testCreateSummaryInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'createSummary.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }


}

?>
