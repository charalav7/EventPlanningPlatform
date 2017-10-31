
<?php

use PHPUnit\Framework\TestCase;
require_once 'wrapper.php';
require_once 'taskListWrapper.php';

class createStaffRequestTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'jack';
        $statusId = 6;
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
    public function testcreateStaffRequest($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'createStaffRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testcreateStaffRequest
    */
    public function testcreateStaffRequestInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'createStaffRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }
}
?>
