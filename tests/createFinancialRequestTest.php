
<?php

use PHPUnit\Framework\TestCase;
require_once 'wrapper.php';
require_once 'taskListWrapper.php';

class createFinancialRequestTest extends TestCase
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
        $this -> assertTrue(false, "No task which could be decided upon.");
    }

    /**
    *@depends testGetTaskList
    */
    public function testcreateFinancialRequest($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'createFinancialRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testcreateFinancialRequest
    */
    public function testcreateFinancialRequestInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'createFinancialRequest.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }
}
?>
