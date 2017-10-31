
<?php

use PHPUnit\Framework\TestCase;
require_once 'wrapper.php';
require_once 'taskListWrapper.php';

class finishBudgetNegotiationTest extends TestCase
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
        $this -> assertTrue(false, "No task for ".$username." with status ".$statusId.".");
    }

    /**
    *@depends testGetTaskList
    */
    public function testfinishBudgetNegotiation($idTask) {

        $_POST['idTask']= $idTask;


        //get output
        $testingFile = 'fmBudgetNegotiation.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("success", $obj['result']);
        return;

    }

    /**
    * @depends testfinishBudgetNegotiation
    */
    public function testfinishBudgetNegotiationInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'fmBudgetNegotiation.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals("failure", $obj['result']);

    }
}
?>
