<?php
use PHPUnit\Framework\TestCase;

require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class getPlanTest extends TestCase
{
    public function testGetTaskList() {
        $username = 'jack';
        $statusId = 8;
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
    public function testgetPlan($idTask) {

        $_POST['idTask']= $idTask;

        //get output
        $testingFile = 'getPlan.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertGreaterThan(0, $size, "no plan attached to first compatible task.");
        return;

    }

    /**
    * @depends testgetPlan
    */
    public function testgetPlanInvalidId() {

        $_POST['idTask'] = -1;

        //get output
        $testingFile = 'getPlan.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);

        $this -> assertEquals(0, $size);

    }


}

?>
