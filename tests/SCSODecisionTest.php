<?php

use PHPUnit\Framework\TestCase;
require_once 'taskListWrapper.php';
require_once 'wrapper.php';

class amDecisionTest extends TestCase
{
    public function testHasParam() {
            global $argv, $decision, $argc;
            $accept = "accepted";
            $reject = "rejected";

            $index = sizeof($argv) - 1;

            if($argc == ($index +1) && ($argv[$index]== $accept || $argv[$index] == $reject)){
                $decision = $argv[$index];
                $this -> assertTrue(true);
                return;
            }
            $this -> assertTrue(false, "argument [accepted | rejected] needed.");
    }

    /**
    * @depends testHasParam
    */
    public function testGetTaskList() {
        $username = 'janet';
        $statusId = 1;

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
    public function testDecision($idTask) {
        global $decision;
        $_POST['idTask']= $idTask;
        $_POST['decision'] = $decision;

        //get output
        $testingFile = 'scsoDecision.php';
        $fileLocation = dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $obj = wrapper($fileLocation);
        $size = sizeof($obj);
        $this -> assertEquals("success", $obj['result']);

    }
}
?>
