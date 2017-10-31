
<?php

use PHPUnit\Framework\TestCase;
require_once 'wrapper.php';
require_once 'taskListWrapper.php';

class createTaskSTMTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'jack';
        $statusId = 7;
        $obj = getTaskList($username);
        $size = sizeof($obj);
        for ($i = 0; $i <$size; $i++) {
            if($obj[$i]['status'] == $statusId) {
                $this -> assertTrue(true);
                return $obj[$i]['idTask'];
            }
        }
        $this -> assertTrue(false, "No task for ".$username." with status ".$statusId.".");
    }

    /**
    *@depends testGetTaskList
    */
    public function testcreateTaskSTM($idTask) {

        $_POST['idTask']= $idTask;
        $_POST['assignee']= 'magy';

        //get output
        $testingFile = 'createTaskSTM.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testcreateTaskSTM
    */
    public function testcreateTaskSTMInvalidUser() {

        //use valid id from previous one (still stored)
        //$_POST['idTask'] = -1;
        $_POST['assignee']= null;

        //get output
        $testingFile = 'createTaskSTM.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }
}
?>
