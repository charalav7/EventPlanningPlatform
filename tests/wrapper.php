<?php

function wrapper($filelocation) {
    ob_start(); // Start output buffering
    include $filelocation;
    $list = ob_get_contents(); // Store buffer in variable
    ob_end_clean(); // End buffering and clean up
    return json_decode($list, true);
}
?>
