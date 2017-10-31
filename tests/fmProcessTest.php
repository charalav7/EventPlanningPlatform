<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class fmProcessTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'alice';
        $statusId = 2;
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
    public function testfmProcess($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'fmProcess.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testfmProcess
    */
    public function testfmProcessInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'fmProcess.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }


}

?>
