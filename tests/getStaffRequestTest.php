<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getStaffRequestTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'simon';
        $statusId = 11;
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
    public function testgetStaffRequest($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'getStaffRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertGreaterThan(0, $size, "no staff request attached to first compatible task.");
        return;

    }

    /**
    * @depends testgetStaffRequest
    */
    public function testgetStaffRequestInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'getStaffRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals(null, $obj['experience']);

    }


}

?>
