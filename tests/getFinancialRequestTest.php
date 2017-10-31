<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getFinancialRequestTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'alice';
        $statusId = 9;
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
    public function testgetFinancialRequest($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'getFinancialRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertGreaterThan(0, $size);
        return;

    }

    /**
    * @depends testgetFinancialRequest
    */
    public function testgetFinancialRequestInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'getFinancialRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals(0, $size);

    }


}

?>
