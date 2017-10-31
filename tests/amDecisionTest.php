<?php

use PHPUnit\Framework\TestCase;

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
    public function testAmDecision() {
        $_POST['username'] = 'mike';
        $statusId = 5;

        //get output
        $testingFile = 'getTaskList.php';
        ob_start(); // Start output buffering
        include dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $list = ob_get_contents(); // Store buffer in variable
        ob_end_clean(); // End buffering and clean up
        $obj = json_decode($list, true);
        $size = sizeof($obj);

        for ($i = 0; $i <$size; $i++) {
            if($obj[$i]['status'] == $statusId) {
                $this -> assertTrue(true);
                return $obj[$i]['idTask'];
            }
        }
        $this -> assertTrue(false, "No task which could be decided upon.");

        //print_r($obj[0]['subject']);
    }

    /**
    *@depends testAmDecision
    */
    public function testAccept($idTask) {
        global $decision;
        $_POST['idTask']= $idTask;
        $_POST['decision'] = $decision;

        //get output
        $testingFile = 'amDecision.php';
        ob_start(); // Start output buffering
        include dirname(__FILE__).'/../app/php/'.$testingFile.'';
        $list = ob_get_contents(); // Store buffer in variable
        ob_end_clean(); // End buffering and clean up
        $obj = json_decode($list, true);
        $size = sizeof($obj);
        $this -> assertEquals("success", $obj['result']);

    }
}
?>
